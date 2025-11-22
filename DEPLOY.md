# 🚀 Deploy Guide - Blockchain Apps

## 📦 Files Created for Deployment

### Backend Files:
- ✅ `backend/.gitignore` - Ignore node_modules, .env, logs
- ✅ `backend/railway.json` - Railway config
- ✅ `backend/render.yaml` - Render config
- ✅ `backend/.env.production` - Production env template

### Frontend Files:
- ✅ `frontend/.gitignore` - Ignore .next, node_modules, .env
- ✅ `frontend/vercel.json` - Vercel config
- ✅ `frontend/.env.production` - Production env template

### Root Files:
- ✅ `railway.json` - Railway monorepo config
- ✅ `DEPLOY.md` - This file

---

## 🎯 OPTION 1: Railway (Recommended - All-in-one)

### Step 1: Prepare Repository
```bash
# Commit all files
git add .
git commit -m "Add deployment configs"
git push origin main
```

### Step 2: Deploy to Railway

1. **Truy cập Railway:**
   - https://railway.app
   - Sign up with GitHub
   - "New Project" → "Deploy from GitHub repo"

2. **Select Repository:**
   - Chọn: `blockchain-apps`
   - Railway tự động detect monorepo

3. **Configure Backend Service:**
   - Service: `backend`
   - Environment Variables:
     ```
     NODE_ENV=production
     PORT=10000
     ETHERSCAN_API_KEY=your_key_here
     ZAN_API_KEY=your_key_here
     ZAN_API_URL=https://api.zan.top/node/v1/eth/mainnet/your_key
     COINMARKETCAP_API_KEY=your_key_here
     RATE_LIMIT_WINDOW_MS=900000
     RATE_LIMIT_MAX_REQUESTS=100
     ```
   - Deploy!

4. **Configure Frontend Service:**
   - Service: `frontend`
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=${{backend.RAILWAY_PUBLIC_DOMAIN}}
     ```
   - Deploy!

5. **Get URLs:**
   - Backend: `https://backend-production-xxxx.up.railway.app`
   - Frontend: `https://frontend-production-xxxx.up.railway.app`

### Railway Pricing:
- Free: $5 credit/month (~500 hours)
- Perfect for MVP/Demo

---

## 🎯 OPTION 2: Vercel (Frontend) + Render (Backend)

### A. Deploy Backend to Render

1. **Create Backend Repository:**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Backend for deployment"
   git remote add origin https://github.com/nguyenquanghuy12345678/blockchain-apps-backend.git
   git push -u origin main
   ```

2. **Deploy on Render:**
   - https://render.com
   - "New" → "Web Service"
   - Connect repository: `blockchain-apps-backend`
   - Settings:
     - Name: `blockchain-apps-api`
     - Region: `Singapore`
     - Branch: `main`
     - Build Command: `npm install`
     - Start Command: `npm start`
   - Environment Variables (from `render.yaml`):
     ```
     NODE_ENV=production
     PORT=10000
     ETHERSCAN_API_KEY=...
     ZAN_API_KEY=...
     ZAN_API_URL=...
     COINMARKETCAP_API_KEY=...
     ```
   - Create Web Service

3. **Copy Backend URL:**
   - Example: `https://blockchain-apps-api.onrender.com`

### B. Deploy Frontend to Vercel

1. **Update Frontend Environment:**
   ```bash
   cd frontend
   # Create .env.local
   echo "NEXT_PUBLIC_API_URL=https://blockchain-apps-api.onrender.com" > .env.local
   ```

2. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Frontend for deployment"
   git remote add origin https://github.com/nguyenquanghuy12345678/blockchain-apps-frontend.git
   git push -u origin main
   ```

3. **Deploy on Vercel:**
   - https://vercel.com
   - "Add New" → "Project"
   - Import Git Repository: `blockchain-apps-frontend`
   - Framework Preset: `Next.js`
   - Root Directory: `./`
   - Environment Variables:
     ```
     NEXT_PUBLIC_API_URL=https://blockchain-apps-api.onrender.com
     ```
   - Deploy!

4. **Get Frontend URL:**
   - Example: `https://blockchain-apps-frontend.vercel.app`

### Vercel + Render Pricing:
- Vercel: Free (Hobby plan)
- Render: Free tier available
- Both perfect for personal projects

---

## 🎯 OPTION 3: Vercel (Frontend Only)

Nếu chỉ muốn deploy frontend với mock data:

```bash
cd frontend
vercel login
vercel --prod
```

Environment Variables trên Vercel:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## ✅ Pre-Deploy Checklist

### Before Pushing to GitHub:
- [ ] **Backend `.env`** không được commit (check `.gitignore`)
- [ ] **Frontend `.env.local`** không được commit
- [ ] API keys đã chuẩn bị (Etherscan, ZAN, CoinMarketCap)
- [ ] `package.json` có đủ dependencies
- [ ] `"engines"` node version đã set (≥18.0.0)

### After Deployment:
- [ ] Test backend health: `https://your-api.com/health`
- [ ] Test backend API: `https://your-api.com/api/whale/top`
- [ ] Test frontend: `https://your-app.vercel.app`
- [ ] Check browser console for CORS errors
- [ ] Verify API calls working

---

## 🔧 Environment Variables Summary

### Backend (.env):
```bash
NODE_ENV=production
PORT=10000

# API Keys
ETHERSCAN_API_KEY=YOUR_KEY
ZAN_API_KEY=YOUR_KEY
ZAN_API_URL=YOUR_URL
COINMARKETCAP_API_KEY=YOUR_KEY

# Rate Limit
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Frontend (.env.local):
```bash
NEXT_PUBLIC_API_URL=https://your-backend-url
```

---

## 🐛 Common Issues

### 1. CORS Error
**Solution:** Update backend CORS config:
```javascript
// backend/src/index.js
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-frontend.vercel.app'
  ]
}));
```

### 2. API URL Not Found
**Solution:** Check environment variable:
```javascript
// Frontend - check console
console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
```

### 3. Build Failed on Vercel
**Solution:** Check Next.js version and dependencies:
```bash
npm install next@latest react@latest react-dom@latest
```

### 4. Railway/Render Sleep Mode
**Problem:** Free tier apps sleep after 15 mins inactivity
**Solution:** 
- Upgrade to paid plan
- Use UptimeRobot to ping every 5 mins
- Accept cold start delay (~30s)

---

## 📊 Deployment Status

### Railway:
- ✅ Backend + Frontend cùng 1 project
- ✅ Monorepo support
- ✅ Auto HTTPS
- ⏱️ Free: $5/month credit

### Vercel + Render:
- ✅ Vercel: Best for Next.js
- ✅ Render: Good for Node.js API
- ✅ Both có free tier
- ⏱️ Render free: 750 hours/month

### Recommended:
**Railway** → Dễ nhất, monorepo, auto config
**Vercel + Render** → Free tier lâu dài hơn

---

## 🎉 Next Steps After Deploy

1. **Setup Custom Domain** (Optional)
   - Vercel: Add domain in settings
   - Railway: Add domain + configure DNS

2. **Monitoring**
   - Railway: Built-in metrics
   - Render: Built-in logs
   - Vercel: Analytics dashboard

3. **CI/CD**
   - All platforms auto-deploy on git push
   - Configure branch for staging/production

4. **Performance**
   - Enable caching
   - Add CDN
   - Optimize images

---

## 📝 Commands Reference

```bash
# Railway CLI
npm i -g @railway/cli
railway login
railway init
railway up
railway logs

# Vercel CLI
npm i -g vercel
vercel login
vercel --prod
vercel logs

# Git
git add .
git commit -m "Deploy config"
git push origin main
```

---

## 🆘 Support

- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

---

**Ready to deploy! 🚀**

Choose your platform and follow the steps above.
