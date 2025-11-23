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

## 🎯 OPTION 1A: Cyclic.sh (KHÔNG SLEEP - For VN) ⭐⭐⭐⭐⭐

**Best for:** Người dùng Việt Nam, cần backend chạy 24/7 miễn phí

### Quick Deploy (2 phút):
```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to Cyclic"
git push origin main

# 2. Go to https://cyclic.sh
# 3. Sign in with GitHub → Link Your Own
# 4. Select repository → Auto deploy!
# 5. Add Environment Variables in dashboard
```

**Features:**
- ✅ MIỄN PHÍ - Không credit card
- ✅ KHÔNG SLEEP - Chạy 24/7
- ✅ Tốc độ ổn từ VN (~200-300ms)
- ✅ 1-click deploy từ GitHub
- ⚠️ Limit: 10k requests/day, 1GB bandwidth/day

**URL:** `https://blockchain-apps-api.cyclic.app`

Chi tiết: [`backend/README-CYCLIC.md`](backend/README-CYCLIC.md)

---

## 🎯 OPTION 1B: Deta Space (NHANH NHẤT - For VN) ⭐⭐⭐⭐⭐

**Best for:** Cần tốc độ cao nhất, unlimited free

### CLI Deploy:
```bash
# 1. Install CLI
iwr https://get.deta.dev/space-cli.ps1 -useb | iex

# 2. Login & Deploy
space login
cd backend
space push
space release
```

**Features:**
- ✅ MIỄN PHÍ VĨNH VIỄN - Unlimited
- ✅ KHÔNG SLEEP - Always on
- ✅ NHANH NHẤT từ VN (~100-150ms)
- ✅ Server Singapore
- ✅ Unlimited requests/bandwidth

**URL:** `https://blockchain-apps-api-1-xxx.deta.app`

Chi tiết: [`backend/README-DETA.md`](backend/README-DETA.md)

---

## 🎯 OPTION 1C: Render.com (Stable)

**Best for:** Ổn định, dễ dùng

### 1️⃣ Push to GitHub:
```bash
git add .
git commit -m "Add deployment configs"
git push origin main
```

### 2️⃣ Deploy Backend to Render:
1. Go to https://render.com
2. Sign up with GitHub
3. "New" → "Web Service"
4. Connect repository: `blockchain-apps`
5. Settings:
   - **Name:** `blockchain-apps-api`
   - **Region:** `Singapore`
   - **Root Directory:** `backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

### 3️⃣ Configure Backend Environment Variables:
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

### 4️⃣ Deploy Frontend to Vercel hoặc Netlify:

#### Option A: Vercel (Recommended for Next.js)
```bash
# 1. Go to https://vercel.com
# 2. Import project from GitHub: blockchain-apps
# 3. Root Directory: frontend
# 4. Add env: NEXT_PUBLIC_API_URL=https://blockchain-apps-api.onrender.com
# 5. Deploy!
```

#### Option B: Netlify (Alternative)
```bash
# 1. Go to https://app.netlify.com
# 2. Import project from GitHub: blockchain-apps
# 3. Base directory: frontend
# 4. Build: npm run build | Publish: .next
# 5. Add env: NEXT_PUBLIC_API_URL=https://blockchain-apps-api.onrender.com
# 6. Deploy!
```

### 5️⃣ Done! 🎉
- Backend: `https://blockchain-apps-api.onrender.com`
- Frontend (Vercel): `https://blockchain-apps-frontend.vercel.app`
- Frontend (Netlify): `https://blockchain-apps-frontend.netlify.app`

**Free Tier:** 
- Render: 750 hours/month
- Vercel: Unlimited bandwidth
- Netlify: 100GB bandwidth/month

---

## 🎯 OPTION 2: Alternative Free Platforms (Không Sleep)

### Koyeb (Good for VN):

**Features:**
- ✅ Free tier stable
- ✅ KHÔNG SLEEP
- ✅ Server Singapore/Tokyo
- ✅ 100GB bandwidth/month
- ⚡ Tốc độ từ VN: ~150-200ms

```bash
# Deploy
# 1. https://koyeb.com → Sign up
# 2. Create App from GitHub
# 3. Repository: blockchain-apps
# 4. Build: npm install | Run: npm start
# 5. Add environment variables
# 6. Deploy!
```

---

### Fly.io (Premium Free):

**Features:**
- ✅ KHÔNG SLEEP - Always on
- ✅ Server Singapore - Low latency
- ✅ 3 VMs free + 160GB bandwidth
- ⚠️ Cần credit card (không charge)

```bash
# Install CLI
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# Deploy
fly auth login
cd backend
fly launch --region sin
fly secrets set ETHERSCAN_API_KEY=xxx ...
fly deploy
```

---

### Railway (All-in-one):

1. **Deploy both services:**
   ```bash
   # Push to GitHub first
   git push origin main
   
   # Deploy to Railway
   # https://railway.app → New Project → Deploy from GitHub
   ```

2. **Railway auto-detects monorepo**
   - Backend service: automatic
   - Frontend service: automatic

3. **Add environment variables:**
   - Backend: API keys
   - Frontend: `NEXT_PUBLIC_API_URL=${{backend.RAILWAY_PUBLIC_DOMAIN}}`

**Free Tier:** $5 credit/month

---

### Fly.io + Vercel:

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

### Backend:

**Render:**
- Free: 750 hours/month
- Starter: $7/month
- ⭐ Recommended

**Cyclic:**
- Free: 10k requests/day
- Pro: $5/month unlimited
- ⭐ No sleep

**Deta Space:**
- Free: Unlimited forever
- ⭐ Best value

### Frontend:

**Vercel:**
- Hobby: Free (unlimited bandwidth)
- Pro: $20/month
- ⭐ Best for Next.js

**Netlify:**
- Starter: Free (100GB bandwidth)
- Pro: $19/month
- ⭐ Great alternative

### Railway:
- Free: $5 credit/month
- Pro: $20/month (more resources)

### Fly.io:
- Free: 3 apps, 160GB bandwidth
- Pay as you go

**Recommendation:** Render + Vercel (stable, free, no sleep on paid tier)

---

## 🎉 Summary

**Files created:** 11
**Platforms supported:** Render (recommended), Vercel, Railway, Fly.io
**Time to deploy:** ~15 minutes
**Cost:** FREE tier available

**Recommended Stack cho VN:**
- Backend: Cyclic/Deta Space (unlimited, không sleep)
- Frontend: Vercel/Netlify (free, global CDN)

**Alternative:**
- Backend: Render.com (750h/month, có sleep)
- Backend: Koyeb/Fly.io (không sleep, stable)
- Frontend: Netlify (100GB/month, serverless functions)

**Next Steps:**
1. Push to GitHub
2. Deploy backend to Render
3. Deploy frontend to Vercel
4. Add API keys
5. Test!

Good luck! 🚀
