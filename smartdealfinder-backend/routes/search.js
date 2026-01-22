const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/", async (req, res) => {
  const { searchText, platforms } = req.body;
  const selectedPlatforms = platforms;

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }


  const products = await Product.find({
    platformName: { $in: selectedPlatforms },
    productName: { $regex: escapeRegex(searchText), $options: "i" }
  });

  if (!products.length) {
    return res.json({ bestDeal: null, deals: [] });
  }

  // 💡 Smart score formula
  const scored = products.map(p => {
  // We use Math.max(1, ...) to avoid log(0) or negative numbers
  // This gives a 'weight' based on how many people trusted the product
  const reviewVolumeWeight = Math.log10(Math.max(1, p.noOfPeopleRated || 1));

  const score =
    (p.rating * reviewVolumeWeight) + // Quality * Popularity
    (p.sellerRating * 1.5) -          // Trust Factor
    (p.price / 100);                  // Price Penalty

  return { ...p._doc, score };
});
  const bestDeal = scored.reduce((best, curr) =>
    curr.score > best.score ? curr : best
  );

  res.json({
    bestDeal: {
      productName: bestDeal.productName,
      platformName: bestDeal.platformName,
      price: bestDeal.price,
      rating: bestDeal.rating,
      discount: bestDeal.discount,
      seller: bestDeal.seller,
      sellerRating: bestDeal.sellerRating,
      productUrl:bestDeal.productUrl,
      image: bestDeal.image
        ? `http://localhost:7000/uploads/${bestDeal.image}`
        : null,
      noOfPeopleRated: bestDeal.noOfPeopleRated
    },
    deals: products.map(p => ({
      platformName: p.platformName,
      price: p.price,
      rating: p.rating,
      discount: p.discount,
      productUrl: p.productUrl,
      seller: p.seller,
      sellerRating: p.sellerRating,
      noOfPeopleRated: bestDeal.noOfPeopleRated
    }))
  });
});

module.exports = router;