# Kandeke Backend

This is the backend API for **Ka Ndeke - Zambezi Airways (Aviator Game)**.  
It handles:
- User registration and login
- Balance tracking
- Deposits via **MTN MoMo Collections API**
- Withdrawals via **MTN MoMo Disbursements API**

---

## 🚀 Tech Stack
- Node.js
- Express.js
- Axios (for API calls)
- MTN MoMo Sandbox / Production APIs
- Render (deployment)

---

## ⚙️ Environment Variables

You must set these in your `.env` file (for local) or in **Render → Environment**:

```env
# Collection API (Deposits)
MOMO_COLLECTION_USER_ID=your-collection-user-id
MOMO_COLLECTION_API_KEY=your-collection-api-key
MOMO_COLLECTION_SUBSCRIPTION_KEY=your-collection-subscription-key

# Disbursement API (Withdrawals)
MOMO_DISBURSE_USER_ID=your-disbursement-user-id
MOMO_DISBURSE_API_KEY=your-disbursement-api-key
MOMO_DISBURSE_SUBSCRIPTION_KEY=your-disbursement-subscription-key

# General
MOMO_TARGET_ENV=sandbox   # use "production" when live
PORT=5000
