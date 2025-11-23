# 🚀 Deploy Backend to Glitch

## ✅ Tại sao chọn Glitch?

- ✅ **MIỄN PHÍ** - Không cần credit card
- ✅ **Code trực tiếp** - Online editor
- ✅ **Auto deploy** - Save là deploy
- ✅ **Community** - Remix projects
- ✅ **4000 requests/hour** free
- ✅ **Simple & Fun** - Dễ dùng nhất

**Nhược điểm:**
- ⚠️ Sleep sau 5 phút không dùng (free tier)
- ⚠️ Giới hạn 4000 requests/hour

---

## 🎯 Quick Start

### Bước 1: Import từ GitHub

1. **Truy cập Glitch:**
   - https://glitch.com
   - Sign up with GitHub

2. **Import Project:**
   - Click "New Project" → "Import from GitHub"
   - Paste repo URL: `https://github.com/YOUR_USERNAME/blockchain-apps`
   - Glitch tự động import

3. **Configure:**
   - Edit `.env` file trong Glitch editor
   - Add API keys:
     ```env
     NODE_ENV=production
     PORT=3000
     ETHERSCAN_API_KEY=your_key
     ZAN_API_KEY=your_key
     ZAN_API_URL=your_url
     COINMARKETCAP_API_KEY=your_key
     ```

4. **Auto Deploy:**
   - Save file → Auto restart
   - App chạy ngay!

### Bước 2: Get URL

```
https://your-project-name.glitch.me
```

---

## 📁 Files cần thiết

### ✅ `glitch.json` (đã tạo sẵn)

```json
{
  "install": "npm install",
  "start": "npm start",
  "watch": {
    "ignore": [".git", "node_modules"]
  }
}
```

### ✅ `package.json`

Đã có sẵn, Glitch tự động detect!

---

## 🔧 Configuration

### Keep Alive (Tránh sleep):

**Option 1: UptimeRobot**
- https://uptimerobot.com (free)
- Ping every 5 minutes
- Giữ app luôn chạy

**Option 2: Glitch Boosted ($8/month)**
- No sleep
- 2x faster
- More memory

### Custom Domain:

Glitch free không hỗ trợ custom domain.
Upgrade to Boosted để có custom domain.

---

## 🎨 Features

### Online Editor:
- Edit code trực tiếp trong browser
- Auto save & deploy
- Terminal built-in
- Logs real-time

### Collaboration:
- Invite team members
- Real-time editing
- Comments on code

### Remix:
- Fork any public Glitch project
- Learn from community
- Share your projects

---

## 💰 Pricing

### Free:
- 4000 requests/hour
- 512 MB RAM
- Sleep sau 5 phút
- Public projects

### Boosted ($8/month):
- No sleep
- 2x faster
- More memory
- Custom domain

---

## 📝 Checklist

- [x] Glitch account
- [x] `glitch.json` created
- [ ] Project imported
- [ ] Environment variables set
- [ ] Test endpoints
- [ ] Setup UptimeRobot (optional)

---

**Glitch URL:** `https://your-project.glitch.me`

Fun & Easy! 🎨
