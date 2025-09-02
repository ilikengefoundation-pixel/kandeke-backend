# Kandeke Backend

This is the backend API for **Ka Ndeke - Zambezi Airways** (Aviator game).

## Features
- User registration & login
- Balance tracking (deposit/withdraw)
- MTN MoMo API integration (sandbox/production ready)
- Express.js REST API

## Routes
- `GET /health` → Health check
- `POST /api/register` → Create a new user
- `POST /api/login` → Login user
- `POST /api/deposit` → Deposit funds (via MoMo)
- `POST /api/withdraw` → Withdraw funds (via MoMo)

## Environment Variables
Set these in `.env` (or Render environment settings):
