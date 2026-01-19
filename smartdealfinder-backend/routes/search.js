const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/", async (req, res) => {
  const { searchText, platforms } = req.body;
  const selectedPlatforms = platforms;


  const products = await Product.find({
    platformName: { $in: selectedPlatforms },
    productName: { $regex: searchText, $options: "i" }
  });

  if (!products.length) {
    return res.json({ bestDeal: null, deals: [] });
  }

  // 💡 Smart score formula
  const scored = products.map(p => {
    const score =
      (p.rating * 2) +
      (p.sellerRating * 1.5) -
      (p.price / 100);

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
      discount: bestDeal.discount
    },
    deals: products.map(p => ({
      platformName: p.platformName,
      price: p.price,
      rating: p.rating,
      discount: p.discount
    }))
  });
});

module.exports = router;