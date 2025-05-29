const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/auth');
const Watchlist = require('../models/Watchlist');

// ✅ POST: Add movie to watchlist
router.post('/add', authenticate, async (req, res) => {
  const { movieId, movieTitle, thumbnail } = req.body;

  try {
    const newItem = new Watchlist({
      userId: req.user.id,
      movieId,
      movieTitle,
      thumbnail
    });

    await newItem.save();
    res.json({ message: "Added to Watch Later" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ GET: User's Watchlist
router.get('/list', authenticate, async (req, res) => {
  try {
    const list = await Watchlist.find({ userId: req.user.id });
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: "Error fetching watchlist" });
  }
});

module.exports = router;
// ✅ DELETE movie from watchlist
router.delete('/remove/:id', authenticate, async (req, res) => {
  try {
    const item = await Watchlist.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!item) {
      return res.status(404).json({ message: "Item not found or unauthorized" });
    }

    res.json({ message: "Removed from Watch Later" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});
