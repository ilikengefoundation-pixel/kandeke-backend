// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// In-memory user store (for demo only)
let users = {};
let balances = {};

// Register user
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (users[username]) {
    return res.status(400).json({ error: 'User already exists' });
  }
  users[username] = { password };
  balances[username] = 0;
  res.json({ message: 'User registered successfully' });
});

// Login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!users[username] || users[username].password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful', balance: balances[username] });
});

// Deposit (simulate MoMo)
app.post('/api/deposit', async (req, res) => {
  const { username, amount } = req.body;
  if (!users[username]) return res.status(404).json({ error: 'User not found' });

  // TODO: Replace with actual MoMo API call using axios
  balances[username] += amount;
  res.json({ message: 'Deposit successful', balance: balances[username] });
});

// Withdraw (simulate MoMo)
app.post('/api/withdraw', async (req, res) => {
  const { username, amount } = req.body;
  if (!users[username]) return res.status(404).json({ error: 'User not found' });
  if (balances[username] < amount) return res.status(400).json({ error: 'Insufficient balance' });

  // TODO: Replace with actual MoMo API call using axios
  balances[username] -= amount;
  res.json({ message: 'Withdrawal successful', balance: balances[username] });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
