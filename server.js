// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.json());
app.use(cors());

// === ENVIRONMENT VARIABLES ===
const COLLECTION_USER = process.env.MOMO_COLLECTION_USER_ID;
const COLLECTION_KEY = process.env.MOMO_COLLECTION_API_KEY;
const COLLECTION_SUBSCRIPTION_KEY = process.env.MOMO_COLLECTION_SUBSCRIPTION_KEY;

const DISBURSE_USER = process.env.MOMO_DISBURSE_USER_ID;
const DISBURSE_KEY = process.env.MOMO_DISBURSE_API_KEY;
const DISBURSE_SUBSCRIPTION_KEY = process.env.MOMO_DISBURSE_SUBSCRIPTION_KEY;

const TARGET_ENV = process.env.MOMO_TARGET_ENV || "sandbox";

// === DEMO STORAGE (replace with database later) ===
let users = {};
let balances = {};

// === ROUTES ===

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

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

// Login user
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!users[username] || users[username].password !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful', balance: balances[username] });
});

// === MTN MOMO HELPERS ===

// Create token for Collections
async function getCollectionToken() {
  const url = "https://sandbox.momodeveloper.mtn.com/collection/token/";
  const auth = Buffer.from(`${COLLECTION_USER}:${COLLECTION_KEY}`).toString("base64");

  const res = await axios.post(url, null, {
    headers: {
      Authorization: `Basic ${auth}`,
      "Ocp-Apim-Subscription-Key": COLLECTION_SUBSCRIPTION_KEY
    }
  });
  return res.data.access_token;
}

// Create token for Disbursements
async function getDisburseToken() {
  const url = "https://sandbox.momodeveloper.mtn.com/disbursement/token/";
  const auth = Buffer.from(`${DISBURSE_USER}:${DISBURSE_KEY}`).toString("base64");

  const res = await axios.post(url, null, {
    headers: {
      Authorization: `Basic ${auth}`,
      "Ocp-Apim-Subscription-Key": DISBURSE_SUBSCRIPTION_KEY
    }
  });
  return res.data.access_token;
}

// === DEPOSIT (Collections API) ===
app.post('/api/deposit', async (req, res) => {
  try {
    const { username, amount, phone } = req.body;
    if (!users[username]) return res.status(404).json({ error: 'User not found' });

    const token = await getCollectionToken();
    const referenceId = uuidv4();

    await axios.post(
      "https://sandbox.momodeveloper.mtn.com/collection/v1_0/requesttopay",
      {
        amount: amount.toString(),
        currency: "EUR", // Change to ZMW for production
        externalId: "123456",
        payer: { partyIdType: "MSISDN", partyId: phone },
        payerMessage: "Deposit",
        payeeNote: "Ka Ndeke Game Deposit"
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-R
