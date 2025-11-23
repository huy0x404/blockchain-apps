# 🚀 Deploy Backend to Render.com

## Quick Start

### 1. Push to GitHub
```bash
cd backend
git init
git add .
git commit -m "Backend ready for Render"
git remote add origin https://github.com/YOUR_USERNAME/blockchain-apps.git
git push -u origin main
```

### 2. Deploy on Render

1. **Truy cập Render:**
   - https://render.com
   - Sign up with GitHub

2. **Create Web Service:**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select `blockchain-apps` repository

3. **Configure Service:**
   ```
   Name: blockchain-apps-api
   Region: Singapore (hoặc gần bạn nhất)
   Branch: main
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Choose Plan:**
   - Free tier: 750 hours/month
   - Starter: $7/month (no sleep)

5. **Add Environment Variables:**
   Click "Environment" → Add variables:
   ```
   NODE_ENV=production
   PORT=10000
   ETHERSCAN_API_KEY=your_etherscan_key_here
   ZAN_API_KEY=your_zan_key_here
   ZAN_API_URL=https://api.zan.top/node/v1/eth/mainnet/your_key
   COINMARKETCAP_API_KEY=your_coinmarketcap_key_here
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

6. **Create Web Service**
   - Click "Create Web Service"
   - Wait ~5 minutes for deployment

### 3. Get Your Backend URL

After deployment completes:
```
https://blockchain-apps-api.onrender.com
```

Copy this URL - you'll need it for frontend deployment!

---

## Testing Backend

### Health Check:
```bash
curl https://blockchain-apps-api.onrender.com/health
```

Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "uptime": 123.45,
  "timestamp": "2025-11-23T..."
}
```

### Test API Endpoints:
```bash
# Whale tracker
curl https://blockchain-apps-api.onrender.com/api/whale/top

# DeFi data
curl https://blockchain-apps-api.onrender.com/api/defi/protocols

# Airdrop data
curl https://blockchain-apps-api.onrender.com/api/airdrop/active
```

---

## Environment Variables Needed

### Required:
- `ETHERSCAN_API_KEY` - Get from https://etherscan.io/myapikey
- `ZAN_API_KEY` - Get from https://zan.top
- `ZAN_API_URL` - From ZAN dashboard
- `COINMARKETCAP_API_KEY` - Get from https://pro.coinmarketcap.com/signup

### Optional (has defaults):
- `NODE_ENV` - Default: `production`
- `PORT` - Default: `10000`
- `RATE_LIMIT_WINDOW_MS` - Default: `900000`
- `RATE_LIMIT_MAX_REQUESTS` - Default: `100`

---

## Render.yaml Config

File `render.yaml` đã được tạo sẵn với config:

```yaml
services:
  - type: web
    name: blockchain-apps-api
    env: node
    region: singapore
    plan: free
    buildCommand: npm install
    startCommand: npm start
    healthCheckPath: /health
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 10000
      # ... other variables
```

---

## Auto-Deploy from GitHub

Render tự động deploy khi bạn push code mới:

```bash
# Make changes
git add .
git commit -m "Update backend"
git push origin main

# Render auto-deploys in ~2 minutes
```

---

## Monitoring & Logs

### View Logs:
1. Render Dashboard → Your Service
2. Click "Logs" tab
3. Real-time logs streaming

### Metrics:
- CPU usage
- Memory usage
- Request count
- Response time

---

## Custom Domain (Optional)

1. **Render Dashboard** → Your Service → "Settings"
2. Scroll to "Custom Domain"
3. Add your domain: `api.yourdomain.com`
4. Update DNS records:
   ```
   CNAME api yourdomain.onrender.com
   ```
5. Wait for SSL certificate (auto-issued)

---

## Troubleshooting

### Build Failed:
```bash
# Check package.json scripts
npm install  # Test locally
npm start    # Test locally
```

### Service Crashed:
- Check Render logs
- Verify environment variables
- Check API keys are valid

### Slow Response:
- Free tier sleeps after 15 min inactivity
- First request after sleep: ~30s
- Upgrade to Starter plan ($7/mo) for no sleep

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

---

## Free Tier Limits

- **750 hours/month** (~31 days)
- **512 MB RAM**
- **0.1 CPU**
- **Sleeps after 15 min** inactivity
- **100 GB bandwidth/month**

### Upgrade Benefits ($7/mo):
- No sleep
- 512 MB RAM
- 0.5 CPU
- Faster builds

---

## Next Steps

After backend is deployed:

1. ✅ Copy backend URL
2. ✅ Deploy frontend to Vercel
3. ✅ Set `NEXT_PUBLIC_API_URL` in Vercel
4. ✅ Test full stack!

---

## Support

- Render Docs: https://render.com/docs
- Community: https://community.render.com
- Status: https://status.render.com

---

**Render URL:** https://blockchain-apps-api.onrender.com

Good luck! 🚀
