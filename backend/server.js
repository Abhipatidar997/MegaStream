const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// ✅ Load env variables
dotenv.config();

// ✅ Initialize Express
const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Routes
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');

app.use('/api', authRoutes); // /api/login, /api/register
app.use('/api/watchlist', watchlistRoutes); // /api/watchlist/add, /remove, /list

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
