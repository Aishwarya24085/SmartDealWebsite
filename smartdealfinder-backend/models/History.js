const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  username: String,
  searchText: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("History", historySchema);