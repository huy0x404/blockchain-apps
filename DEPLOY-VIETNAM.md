# 🇻🇳 Deploy cho người dùng Việt Nam

## 🎯 Nền tảng MIỄN PHÍ - KHÔNG SLEEP - Tốt cho VN

> 📚 **Xem so sánh chi tiết:** [`BACKEND-PLATFORMS.md`](BACKEND-PLATFORMS.md)

### 1. **Cyclic.sh** ⭐⭐⭐⭐⭐ (EASIEST - RECOMMENDED)

**Ưu điểm:**
- ✅ **MIỄN PHÍ hoàn toàn** - Không cần credit card
- ✅ **KHÔNG BAO GIỜ SLEEP** - Chạy 24/7
- ✅ **Deploy siêu nhanh** - 1 click từ GitHub
- ✅ **Tốc độ ổn định** từ VN (~200-300ms)
- ✅ **Unlimited deployments**
- ✅ **Auto SSL/HTTPS**
- ✅ **Serverless** - Scale tự động

**Nhược điểm:**
- ⚠️ Giới hạn 10,000 requests/day (free tier)
- ⚠️ 1GB bandwidth/day
- ⚠️ Cold start ~2-3s nếu không có traffic

**Cách deploy:**

```bash
# 1. Push code to GitHub
git add .
git commit -m "Deploy to Cyclic"
git push origin main

# 2. Vào https://cyclic.sh
# 3. Sign in with GitHub
# 4. Click "Link Your Own" → Select repository
# 5. Cyclic tự động detect và deploy!

# 6. Add Environment Variables:
# Dashboard → Variables → Add:
NODE_ENV=production
PORT=3000
ETHERSCAN_API_KEY=your_key
ZAN_API_KEY=your_key
ZAN_API_URL=your_url
COINMARKETCAP_API_KEY=your_key
```

**URL mẫu:** `https://blockchain-apps-api.cyclic.app`

---

### 2. **Deta Space** ⭐⭐⭐⭐⭐ (BEST for VN)

**Ưu điểm:**
- ✅ **MIỄN PHÍ VĨNH VIỄN** - Không giới hạn
- ✅ **KHÔNG BAO GIỜ SLEEP**
- ✅ **Tốc độ NHANH từ VN** (~100-150ms) - Server Singapore
- ✅ **Unlimited** requests, bandwidth
- ✅ **Không cần credit card**
- ✅ **CLI đơn giản**
- ✅ **Base Micro** - Like mini containers

**Nhược điểm:**
- 📝 Cần config file `Spacefile`
- 📝 CLI hơi khác so với các platform khác

**Cách deploy:**

```bash
# 1. Install Deta CLI
# Windows PowerShell:
iwr https://get.deta.dev/space-cli.ps1 -useb | iex

# 2. Login
space login

# 3. Create Spacefile (đã tạo sẵn: backend/Spacefile)
# 4. Push và deploy
cd backend
space push

# 5. Tạo public endpoint
space release
```

**URL mẫu:** `https://blockchain-apps-api-1-a1234567.deta.app`

---

### 3. **Koyeb** ⭐⭐⭐⭐ (Good for VN)

**Ưu điểm:**
- ✅ **Free tier ổn định**
- ✅ **KHÔNG SLEEP** (free tier)
- ✅ **Server gần VN** - Singapore, Tokyo
- ✅ **2 web services miễn phí**
- ✅ **Container-based** - Stable
- ✅ **Auto scale**

**Nhược điểm:**
- ⚠️ Giới hạn 100GB bandwidth/month
- ⚠️ 512MB RAM max (free)

**Cách deploy:**

```bash
# 1. Push to GitHub
git push origin main

# 2. Vào https://koyeb.com
# 3. Sign up (free, no credit card)
# 4. Create App → From GitHub
# 5. Settings:
#    - Repository: blockchain-apps
#    - Branch: main
#    - Build: npm install
#    - Run: npm start
#    - Port: 5000

# 6. Add Environment Variables trong dashboard

# 7. Deploy!
```

**URL mẫu:** `https://blockchain-apps-api-xyz.koyeb.app`

---

### 4. **Fly.io** ⭐⭐⭐⭐ (Premium Free Tier)

**Ưu điểm:**
- ✅ **KHÔNG SLEEP** - Always on
- ✅ **Server Singapore** - Ping thấp từ VN
- ✅ **3 shared-cpu-1x VMs miễn phí**
- ✅ **160GB bandwidth/month**
- ✅ **Global CDN**
- ✅ **PostgreSQL miễn phí** (nếu cần sau này)

**Nhược điểm:**
- ⚠️ Cần credit card (không charge nếu trong free tier)
- 📝 CLI hơi phức tạp

**Cách deploy:**

```bash
# 1. Install Fly CLI
# PowerShell (Windows):
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"

# 2. Login
fly auth login

# 3. Launch app
cd backend
fly launch
# Chọn:
# - App name: blockchain-apps-api
# - Region: Singapore (sin)
# - PostgreSQL: No
# - Redis: No

# 4. Add secrets
fly secrets set ETHERSCAN_API_KEY=xxx ZAN_API_KEY=xxx ZAN_API_URL=xxx COINMARKETCAP_API_KEY=xxx

# 5. Deploy
fly deploy
```

**URL mẫu:** `https://blockchain-apps-api.fly.dev`

---

## 📊 So sánh cho người dùng VN

| Platform | Sleep? | Speed từ VN | Bandwidth | Credit Card? | Dễ dùng |
|----------|--------|-------------|-----------|--------------|---------|
| **Cyclic** | ❌ | ⭐⭐⭐⭐ | 1GB/day | ❌ Không | ⭐⭐⭐⭐⭐ |
| **Deta Space** | ❌ | ⭐⭐⭐⭐⭐ | Unlimited | ❌ Không | ⭐⭐⭐⭐ |
| **Koyeb** | ❌ | ⭐⭐⭐⭐⭐ | 100GB/mo | ❌ Không | ⭐⭐⭐⭐ |
| **Fly.io** | ❌ | ⭐⭐⭐⭐⭐ | 160GB/mo | ⚠️ Cần | ⭐⭐⭐ |
| **Render** | ✅ | ⭐⭐⭐ | 100GB/mo | ❌ Không | ⭐⭐⭐⭐⭐ |
| **Railway** | ❌ | ⭐⭐⭐⭐ | Unlimited | ❌ Không | ⭐⭐⭐⭐⭐ |

---

## 🏆 TOP 3 Recommendations cho VN

### 🥇 #1: **Deta Space** (Best Overall)
```
✅ Free vĩnh viễn, không giới hạn
✅ Server Singapore - nhanh nhất
✅ Không sleep, không cần credit card
⚡ Tốc độ: ~100-150ms từ VN
```

### 🥈 #2: **Cyclic.sh** (Easiest)
```
✅ 1-click deploy từ GitHub
✅ Không sleep, không credit card
✅ UI đẹp, dễ dùng nhất
⚡ Tốc độ: ~200-300ms từ VN
⚠️ Limit: 10k requests/day
```

### 🥉 #3: **Koyeb** (Balanced)
```
✅ Container stable, không sleep
✅ Server Singapore/Tokyo
✅ 100GB bandwidth/month
⚡ Tốc độ: ~150-200ms từ VN
```

---

## 🚀 Quick Start - Deploy ngay

### Option A: Cyclic (Nhanh nhất - 2 phút)

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy to Cyclic"
git push origin main

# 2. Mở browser
# - https://cyclic.sh
# - Sign in with GitHub
# - Link Your Own → blockchain-apps
# - Auto deploy!

# 3. Add env vars trong dashboard
# Done! 🎉
```

### Option B: Deta Space (Tốc độ cao nhất)

```bash
# 1. Install CLI
iwr https://get.deta.dev/space-cli.ps1 -useb | iex

# 2. Login & deploy
space login
cd backend
space push
space release

# 3. Copy URL
# Done! 🎉
```

### Option C: Koyeb (Cân bằng)

```bash
# 1. Push to GitHub
git push origin main

# 2. Mở browser
# - https://koyeb.com
# - Create App from GitHub
# - blockchain-apps
# - Add env vars
# - Deploy!

# Done! 🎉
```

---

## 📝 Environment Variables (Giống nhau cho tất cả)

```env
NODE_ENV=production
PORT=3000
ETHERSCAN_API_KEY=your_etherscan_key
ZAN_API_KEY=your_zan_key
ZAN_API_URL=https://api.zan.top/node/v1/eth/mainnet/your_key
COINMARKETCAP_API_KEY=your_cmc_key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

---

## 🧪 Test Speed từ VN

```bash
# Test ping
curl -w "@curl-format.txt" -o /dev/null -s https://your-app.cyclic.app/health

# hoặc dùng online tool:
# https://tools.keycdn.com/performance
```

---

## ✅ Checklist

### Backend Deployed:
- [ ] Platform đã chọn (Cyclic/Deta/Koyeb/Fly.io)
- [ ] Code pushed to GitHub
- [ ] Environment variables đã add
- [ ] Health check OK: `/health`
- [ ] API test OK: `/api/whale/top`

### Frontend Deploy:
- [ ] Update `.env.production`:
  ```env
  NEXT_PUBLIC_API_URL=https://your-backend-url
  ```
- [ ] Deploy to Vercel hoặc Netlify:
  - **Vercel:** https://vercel.com (unlimited bandwidth)
  - **Netlify:** https://netlify.com (100GB/month, serverless functions)
- [ ] Test full stack!

---

## 💡 Pro Tips

1. **Chọn region gần VN:**
   - Singapore (sin) ⭐
   - Tokyo (nrt)
   - Hong Kong (hkg)

2. **Monitor uptime:**
   - https://uptimerobot.com (free)
   - Ping mỗi 5 phút để tránh cold start

3. **CDN cho frontend:**
   - Vercel auto-CDN (best)
   - Cloudflare Pages (alternative)

4. **Backup plan:**
   - Deploy backend trên 2 platforms
   - Dùng load balancer hoặc failover

---

## 🆘 Support Links

**Platforms:**
- **Cyclic:** https://docs.cyclic.sh
- **Deta Space:** https://deta.space/docs
- **Koyeb:** https://koyeb.com/docs
- **Fly.io:** https://fly.io/docs
- **Railway:** https://docs.railway.app
- **Render:** https://render.com/docs
- **Glitch:** https://glitch.com/help

**Hướng dẫn chi tiết:**
- `backend/README-CYCLIC.md`
- `backend/README-DETA.md`
- `backend/README-KOYEB.md`
- `backend/README-FLYIO.md`
- `backend/README-RAILWAY.md`
- `backend/README-RENDER.md`
- `backend/README-GLITCH.md`
- `BACKEND-PLATFORMS.md` - So sánh tất cả

---

**Recommendation: Deta Space hoặc Cyclic cho người VN! 🇻🇳**

Không sleep, miễn phí, nhanh! 🚀
