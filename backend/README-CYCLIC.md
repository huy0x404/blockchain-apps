# 🚀 Deploy Backend to Cyclic.sh

## ✅ Tại sao chọn Cyclic?

- ✅ **MIỄN PHÍ 100%** - Không cần credit card
- ✅ **KHÔNG BAO GIỜ SLEEP** - Chạy 24/7
- ✅ **Deploy 1 click** - Dễ nhất trong tất cả platforms
- ✅ **Tốc độ ổn từ VN** - ~200-300ms
- ✅ **Auto HTTPS** - SSL miễn phí
- ✅ **Serverless** - Auto scale

---

## 🎯 Quick Start (2 phút)

### Bước 1: Push to GitHub

```bash
cd backend
git add .
git commit -m "Deploy to Cyclic"
git push origin main
```

### Bước 2: Deploy trên Cyclic

1. **Truy cập Cyclic:**
   - https://cyclic.sh
   - Click "Sign in with GitHub"
   - Authorize Cyclic

2. **Link Repository:**
   - Click "Link Your Own"
   - Chọn repository: `blockchain-apps`
   - Cyclic tự động detect Node.js project
   - Click "Connect"

3. **Auto Deploy:**
   - Cyclic tự động:
     - Chạy `npm install`
     - Chạy `npm start`
     - Tạo HTTPS endpoint
   - Đợi ~1 phút

4. **Get URL:**
   ```
   https://blockchain-apps-api.cyclic.app
   ```

### Bước 3: Add Environment Variables

1. **Dashboard** → Your App → "Variables"

2. **Add từng biến:**
   ```
   NODE_ENV=production
   PORT=3000
   ETHERSCAN_API_KEY=your_etherscan_key_here
   ZAN_API_KEY=your_zan_key_here
   ZAN_API_URL=https://api.zan.top/node/v1/eth/mainnet/your_key
   COINMARKETCAP_API_KEY=your_coinmarketcap_key_here
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

3. **Save** → App tự động redeploy

### Bước 4: Test

```bash
# Health check
curl https://blockchain-apps-api.cyclic.app/health

# Test API
curl https://blockchain-apps-api.cyclic.app/api/whale/top
```

---

## 📁 Files cần thiết

### ✅ `cyclic.yml` (đã tạo sẵn)
```yaml
[build]
  command = "npm install"

[deploy]
  command = "npm start"
```

### ✅ `package.json` (đã có)
```json
{
  "scripts": {
    "start": "node src/index.js"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}
```

---

## 🔄 Auto Deploy

Cyclic tự động deploy khi bạn push code:

```bash
# Make changes
git add .
git commit -m "Update backend"
git push origin main

# Cyclic auto-deploys trong ~30 giây
```

---

## 📊 Dashboard Features

### Deployments:
- Xem history deployments
- Rollback về version cũ
- View build logs

### Logs:
- Real-time logs
- Search & filter
- Download logs

### Metrics:
- Requests/minute
- Response time
- Error rate
- Memory usage

### Variables:
- Add/edit environment variables
- Secret values (hidden)
- Auto redeploy on change

---

## ⚙️ Configuration

### Custom Domain (Free):

1. **Dashboard** → "Domains"
2. Add domain: `api.yourdomain.com`
3. Add CNAME record:
   ```
   CNAME api blockchain-apps-api.cyclic.app
   ```
4. Auto SSL certificate

### Cold Start:

- Free tier: ~2-3s cold start nếu không có traffic
- Solution: Ping mỗi 5 phút với UptimeRobot
- Hoặc upgrade để tránh cold start

---

## 📈 Free Tier Limits

- ✅ **10,000 requests/day**
- ✅ **1 GB bandwidth/day**
- ✅ **100 MB code size**
- ✅ **512 MB memory**
- ✅ **10s timeout**

### Nếu vượt limit:
- App vẫn chạy
- Nhưng có thể bị throttle
- Consider upgrade ($5/month unlimited)

---

## 🐛 Troubleshooting

### Build Failed:

```bash
# Test locally
cd backend
npm install
npm start

# Check logs on Cyclic dashboard
```

### Environment Variables không load:

1. Check tên biến (case-sensitive)
2. Không cần dùng quotes `""`
3. Save và đợi redeploy

### API không response:

1. Check logs: Dashboard → Logs
2. Verify PORT=3000 (Cyclic default)
3. Check CORS settings

### Cold Start chậm:

- First request sau idle: ~2-3s
- Solution: Ping định kỳ
- Or upgrade plan

---

## 🔒 Security

### Secure Variables:
- All variables encrypted
- Hidden in dashboard
- Not in logs

### HTTPS:
- Auto enabled
- Free SSL certificate
- Force HTTPS available

### Environment Isolation:
- Separate env per deployment
- No shared state
- Serverless security

---

## 💰 Pricing

### Free (Forever):
- 10k requests/day
- 1GB bandwidth/day
- Perfect for personal projects
- **No credit card needed**

### Pro ($5/month):
- Unlimited requests
- Unlimited bandwidth
- Priority support
- No cold starts

---

## ⚡ Performance Tips

1. **Enable compression:**
   ```javascript
   // Already enabled in src/index.js
   app.use(compression());
   ```

2. **Cache static content:**
   ```javascript
   // Add caching headers
   app.use(express.static('public', {
     maxAge: '1d'
   }));
   ```

3. **Optimize dependencies:**
   ```bash
   # Use production dependencies only
   npm prune --production
   ```

4. **Monitor with UptimeRobot:**
   - https://uptimerobot.com
   - Ping every 5 minutes
   - Prevents cold starts

---

## 📝 Checklist

### Before Deploy:
- [x] Code pushed to GitHub
- [x] `package.json` has correct scripts
- [x] `cyclic.yml` created
- [ ] API keys ready

### After Deploy:
- [ ] App deployed successfully
- [ ] Environment variables added
- [ ] Health check returns 200
- [ ] API endpoints working
- [ ] Frontend updated with new URL

---

## 🔗 Links

- **Dashboard:** https://app.cyclic.sh
- **Docs:** https://docs.cyclic.sh
- **Status:** https://status.cyclic.sh
- **Support:** https://discord.gg/cyclic

---

## 🎉 Next Steps

1. ✅ Copy your Cyclic URL:
   ```
   https://blockchain-apps-api.cyclic.app
   ```

2. ✅ Update frontend `.env.production`:
   ```env
   NEXT_PUBLIC_API_URL=https://blockchain-apps-api.cyclic.app
   ```

3. ✅ Deploy frontend to Vercel

4. ✅ Test full stack!

---

**Cyclic URL:** `https://blockchain-apps-api.cyclic.app`

Đơn giản, nhanh, miễn phí! 🚀
