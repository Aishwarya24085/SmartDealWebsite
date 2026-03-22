const express = require("express");
const router = express.Router();
const History = require("../models/History");

// SAVE SEARCH
router.post("/add", async (req, res) => {
  try {
    const { username, searchText } = req.body;

    const newSearch = new History({ username, searchText });
    await newSearch.save();

    res.json({ message: "Saved to history" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET USER HISTORY
router.get("/:username", async (req, res) => {
  try {
    const data = await History.find({ username: req.params.username })
      .sort({ createdAt: -1 });

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;