const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.post("/", async (req, res) => {
  const { searchText, platforms } = req.body;

  function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  }

  const products = await Product.find({
    platformName: { $in: platforms },
    productName: { $regex: escapeRegex(searchText), $options: "i" }
  });

  if (!products.length) {
    return res.json({ bestDeal: null, deals: [] });
  }

  // Extract arrays
  const prices = products.map(p => p.price);
  const ratings = products.map(p => p.rating);
  const sellerRatings = products.map(p => p.sellerRating);
  const discounts = products.map(p => p.discount);
  const reviews = products.map(p => p.noOfPeopleRated || 1);

  // Helpers
  const min = arr => Math.min(...arr);
  const max = arr => Math.max(...arr);

  const std = arr => {
    const mean = arr.reduce((a, b) => a + b, 0) / arr.length;
    return Math.sqrt(arr.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / arr.length);
  };

  const minPrice = min(prices);
  const maxDiscount = max(discounts);
  const maxReviewLog = Math.max(...reviews.map(r => Math.log10(r + 1)));

  // Normalization
  const normalized = products.map(p => {
    return {
      ...p._doc,
      norms: {
        price_norm: minPrice / p.price,
        rating_norm: p.rating / 5,
        seller_norm: p.sellerRating / 5,
        discount_norm: p.discount / maxDiscount,
        review_norm: Math.log10((p.noOfPeopleRated || 1) + 1) / maxReviewLog
      }
    };
  });

  // Context-aware weights
  const priceVariation = std(prices);
  const ratingVariation = std(ratings);

  let priceWeight = priceVariation > 800 ? 0.35 : 0.25;
  let ratingWeight = ratingVariation > 0.3 ? 0.25 : 0.15;

  let weights = {
    price: priceWeight,
    rating: ratingWeight,
    seller: 0.20,
    discount: 0.10,
    review: 0.10
  };

  // Normalize weights
  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  Object.keys(weights).forEach(k => {
    weights[k] /= totalWeight;
  });

  // Final scoring
  const scored = normalized.map(p => {
    const n = p.norms;

    const score =
      (n.price_norm * weights.price) +
      (n.rating_norm * weights.rating) +
      (n.seller_norm * weights.seller) +
      (n.discount_norm * weights.discount) +
      (n.review_norm * weights.review);

    return { ...p, score };
  });

  // Best deal
  const bestDeal = scored.reduce((best, curr) =>
    curr.score > best.score ? curr : best
  );

  // Response
  res.json({
    bestDeal: {
      productName: bestDeal.productName,
      platformName: bestDeal.platformName,
      price: bestDeal.price,
      rating: bestDeal.rating,
      discount: bestDeal.discount,
      seller: bestDeal.seller,
      sellerRating: bestDeal.sellerRating,
      productUrl: bestDeal.productUrl,
      image: bestDeal.image
        ? `http://localhost:7000/uploads/${bestDeal.image}`
        : null,
      noOfPeopleRated: bestDeal.noOfPeopleRated,
      score: bestDeal.score   // ⭐ IMPORTANT
    },

    deals: scored.map(p => ({
      platformName: p.platformName,
      price: p.price,
      rating: p.rating,
      discount: p.discount,
      productUrl: p.productUrl,
      seller: p.seller,
      sellerRating: p.sellerRating,
      noOfPeopleRated: p.noOfPeopleRated,
      score: p.score   // ⭐ IMPORTANT
    }))
  });
});

module.exports = router;