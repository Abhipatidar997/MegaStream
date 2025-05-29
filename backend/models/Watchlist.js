const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movieTitle: String,
  movieId: String,
  thumbnail: String,
  addedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Watchlist', watchlistSchema);
