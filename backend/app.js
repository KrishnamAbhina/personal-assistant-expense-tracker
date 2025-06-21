// app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // Parse incoming JSON requests

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
const authRoutes = require('./routes/auth'); // for /register and /login
const transactionRoutes = require('./routes/transactions'); // for income/expense

// Route Mounting
app.use('/api/v1/auth', authRoutes);         // 🔐 Register & Login
app.use('/api/v1', transactionRoutes);       // 💰 Income & Expense (protected routes)

// Root health check
app.get('/', (req, res) => {
  res.send('🚀 Backend API is up and running!');
});

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🌐 Server running on http://localhost:${PORT}`);
});
