const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: String,
    platformName: String,
    price: Number,
    rating: Number,
    discount: Number,
    seller: String,
    sellerRating: Number,
    productUrl:String,
    image:String,
    noOfPeopleRated: Number
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
