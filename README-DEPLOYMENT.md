# 🚀 Quick Deployment Guide

## ✅ Files đã tạo sẵn:

### Backend:
- ✅ `backend/.gitignore` - Ignore files
- ✅ `backend/railway.json` - Railway config
- ✅ `backend/render.yaml` - Render config  
- ✅ `backend/.env.production` - Template env
- ✅ `backend/Procfile` - Heroku/Railway process

### Frontend:
- ✅ `frontend/.gitignore` - Ignore files
- ✅ `frontend/vercel.json` - Vercel config
- ✅ `frontend/.env.production` - Template env
- ✅ `frontend/next.config.js` - Updated config

### Root:
- ✅ `railway.json` - Monorepo config
- ✅ `DEPLOY.md` - Full guide

---

## 🎯 OPTION 1: Railway (Easiest - Recommended)

### 1️⃣ Push to GitHub:
```bash
git add .
git commit -m "Add deployment configs"
git push origin main
```

### 2️⃣ Deploy to Railway:
1. Go to https://railway.app
2. Sign up with GitHub
3. "New Project" → "Deploy from GitHub repo"
4. Select: `blockchain-apps`
5. Railway auto-detects monorepo

### 3️⃣ Configure Backend:
**Service:** `backend`

**Environment Variables:**
```
NODE_ENV=production
PORT=10000
ETHERSCAN_API_KEY=your_etherscan_key
ZAN_API_KEY=your_zan_key
ZAN_API_URL=https://api.zan.top/node/v1/eth/mainnet/your_key
COINMARKETCAP_API_KEY=your_cmc_key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### 4️⃣ Configure Frontend:
**Service:** `frontend`

**Environment Variables:**
```
NEXT_PUBLIC_API_URL=${{backend.RAILWAY_PUBLIC_DOMAIN}}
```

### 5️⃣ Done! 🎉
- Backend: `https://backend-production-xxxx.up.railway.app`
- Frontend: `https://frontend-production-xxxx.up.railway.app`

**Free Tier:** $5 credit/month (~500 hours)

---

## 🎯 OPTION 2: Vercel + Render

### Backend on Render:

1. **Create repo:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Backend"
   git remote add origin https://github.com/YOUR_USERNAME/blockchain-apps-backend.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - https://render.com → New → Web Service
   - Connect: `blockchain-apps-backend`
   - Build: `npm install`
   - Start: `npm start`
   - Add Environment Variables (from step 3 above)

3. **Copy URL:** `https://blockchain-apps-api.onrender.com`

### Frontend on Vercel:

1. **Update environment:**
   ```bash
   cd frontend
   echo "NEXT_PUBLIC_API_URL=https://blockchain-apps-api.onrender.com" > .env.local
   ```

2. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Frontend"
   git remote add origin https://github.com/YOUR_USERNAME/blockchain-apps-frontend.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - https://vercel.com → Import Project
   - Select: `blockchain-apps-frontend`
   - Framework: Next.js
   - Environment Variable:
     ```
     NEXT_PUBLIC_API_URL=https://blockchain-apps-api.onrender.com
     ```

4. **Done!** `https://blockchain-apps-frontend.vercel.app`

---

## 📋 Environment Variables Checklist

### Get API Keys:

1. **Etherscan:**
   - https://etherscan.io/myapikey
   - Sign up → Create API Key

2. **ZAN:**
   - https://zan.top
   - Create project → Get API key + URL

3. **CoinMarketCap:**
   - https://pro.coinmarketcap.com/signup
   - Basic plan (free) → Get API key

### Set on Platform:

**Railway/Render:**
- Dashboard → Environment → Add variables
- Paste từ template `.env.production`

**Vercel:**
- Project Settings → Environment Variables
- Add: `NEXT_PUBLIC_API_URL=your_backend_url`

---

## ✅ Testing After Deploy

### 1. Backend Health:
```bash
curl https://your-backend-url/health
```

Expected:
```json
{
  "success": true,
  "status": "healthy"
}
```

### 2. Backend API:
```bash
curl https://your-backend-url/api/whale/top
```

### 3. Frontend:
Open browser: `https://your-frontend-url`
- Check Dashboard loads
- Check Whale Tracker
- Check DeFi Analytics
- Open DevTools → Network tab

---

## 🐛 Troubleshooting

### CORS Error:
Update `backend/src/index.js`:
```javascript
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'
  ]
}));
```

### API Not Found:
Check environment variable:
```javascript
console.log('API:', process.env.NEXT_PUBLIC_API_URL);
```

### Build Failed:
```bash
npm install
npm run build  # Test locally
```

---

## 💰 Pricing

### Railway:
- Free: $5 credit/month
- Pro: $20/month (more resources)

### Vercel:
- Hobby: Free forever
- Pro: $20/month

### Render:
- Free: 750 hours/month
- Starter: $7/month

**Recommendation:** Railway (easiest) or Vercel+Render (free longer)

---

## 🎉 Summary

**Files created:** 11
**Platforms supported:** Railway, Vercel, Render
**Time to deploy:** ~15 minutes
**Cost:** FREE tier available

**Next:** Push to GitHub → Deploy → Add API keys → Test!

Good luck! 🚀
