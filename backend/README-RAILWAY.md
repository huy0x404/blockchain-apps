# 🚀 Deploy Backend to Railway

## ✅ Tại sao chọn Railway?

- ✅ **$5 credit/month** - Free tier generous
- ✅ **KHÔNG SLEEP** - Always on
- ✅ **Monorepo support** - Deploy cả frontend + backend
- ✅ **PostgreSQL free** - Nếu cần database
- ✅ **Auto deploy** - GitHub integration
- ✅ **CLI mạnh mẽ** - Railway CLI
- ✅ **Tốc độ tốt từ VN**

---

## 🎯 Quick Start

### Bước 1: Push to GitHub

```bash
git add .
git commit -m "Deploy to Railway"
git push origin main
```

### Bước 2: Deploy on Railway

1. **Truy cập Railway:**
   - https://railway.app
   - Sign up with GitHub

2. **New Project:**
   - Click "New Project"
   - "Deploy from GitHub repo"
   - Select: `blockchain-apps`

3. **Configure Service:**
   - Railway auto-detects Node.js
   - Select folder: `backend`
   - Auto build & deploy

4. **Environment Variables:**
   - Click service → Variables
   - Add bulk:
     ```
     NODE_ENV=production
     PORT=10000
     ETHERSCAN_API_KEY=your_key
     ZAN_API_KEY=your_key
     ZAN_API_URL=your_url
     COINMARKETCAP_API_KEY=your_key
     RATE_LIMIT_WINDOW_MS=900000
     RATE_LIMIT_MAX_REQUESTS=100
     ```

5. **Generate Domain:**
   - Settings → Networking
   - "Generate Domain"
   - Copy URL

---

## 📁 Files cần thiết

### ✅ `railway.json` (đã tạo sẵn)

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

---

## 🔧 Features

### Auto Deploy:

```bash
git push origin main
# Railway auto-deploys in ~1 minute
```

### CLI:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link project
railway link

# Deploy
railway up

# View logs
railway logs

# Open dashboard
railway open
```

### Database (Optional):

```bash
# Add PostgreSQL
railway add --plugin postgresql

# Environment auto-added:
# DATABASE_URL=postgresql://...
```

### Monorepo:

Deploy both backend + frontend:
```json
{
  "services": {
    "backend": {
      "source": "./backend"
    },
    "frontend": {
      "source": "./frontend"
    }
  }
}
```

---

## 💰 Pricing

### Free Tier:
- **$5 credit/month** (~500 hours)
- 512 MB RAM
- 1 GB disk
- Perfect cho 1-2 services

### Pro ($20/month):
- $20 credit + $0.000231/GB-sec
- More resources
- Team features
- Priority support

**Tips:**
- 1 backend service ~$5/month
- Optimize để nằm trong free tier
- Monitor usage trong dashboard

---

## 📊 Monitoring

### Dashboard:
- CPU usage
- Memory usage
- Deployment history
- Logs real-time

### Metrics:
```bash
# View metrics
railway metrics

# Export logs
railway logs > logs.txt
```

---

## 🐛 Troubleshooting

### Build Failed:

```bash
# Check railway.json
cat railway.json

# Test locally
npm install
npm start

# View Railway logs
railway logs
```

### Out of Credit:

- Check usage: Dashboard → Usage
- Optimize resources
- Upgrade to Pro
- Use multiple platforms

---

## 📝 Checklist

- [x] Railway account
- [x] `railway.json` created
- [ ] GitHub connected
- [ ] Project deployed
- [ ] Environment variables set
- [ ] Domain generated
- [ ] Monitor usage

---

**Railway URL:** `https://backend-production-xxxx.up.railway.app`

Powerful & Modern! 🚂
