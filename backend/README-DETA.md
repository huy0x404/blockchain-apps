# 🚀 Deploy Backend to Deta Space

## ✅ Tại sao chọn Deta Space?

- ✅ **MIỄN PHÍ VĨNH VIỄN** - Unlimited mọi thứ
- ✅ **KHÔNG BAO GIỜ SLEEP** - Always on
- ✅ **NHANH NHẤT từ VN** - Server Singapore (~100ms)
- ✅ **Unlimited** requests, bandwidth, storage
- ✅ **Không cần credit card**
- ✅ **Base Micro** - Container-like deployment
- ✅ **CLI đơn giản**

---

## 🎯 Quick Start

### Bước 1: Install Deta Space CLI

#### Windows (PowerShell):
```powershell
iwr https://get.deta.dev/space-cli.ps1 -useb | iex
```

#### Mac/Linux:
```bash
curl -fsSL https://get.deta.dev/space-cli.sh | sh
```

#### Verify installation:
```bash
space --version
```

### Bước 2: Login

```bash
space login
```

- Browser tự động mở
- Login with GitHub/Email
- CLI tự động authenticate

### Bước 3: Initialize Project

```bash
cd backend

# Initialize (if not done)
space new

# Or use existing Spacefile (đã tạo sẵn)
```

### Bước 4: Configure Spacefile

File `Spacefile` đã được tạo sẵn:

```yaml
v: 0
micros:
  - name: blockchain-api
    src: ./
    engine: nodejs18
    run: npm start
    public_routes:
      - "/*"
    env:
      - name: NODE_ENV
        default: production
      - name: PORT
        default: 8080
```

### Bước 5: Add Environment Variables

Create `.env` file (Deta tự động load):

```bash
# backend/.env
NODE_ENV=production
PORT=8080
ETHERSCAN_API_KEY=your_etherscan_key
ZAN_API_KEY=your_zan_key
ZAN_API_URL=https://api.zan.top/node/v1/eth/mainnet/your_key
COINMARKETCAP_API_KEY=your_cmc_key
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

⚠️ **Important:** Add `.env` to `.gitignore`!

### Bước 6: Push & Deploy

```bash
# Push code to Deta
space push

# This will:
# - Upload code
# - Install dependencies (npm install)
# - Build and deploy
# - Return a preview URL
```

### Bước 7: Create Public Release

```bash
# Make your app public
space release

# Get public URL
space release --listed
```

### Bước 8: Get Your URL

```bash
# View app info
space info

# Your URL will be something like:
# https://blockchain-apps-api-1-a1234567.deta.app
```

---

## 📁 Project Structure

```
backend/
├── Spacefile           ✅ Created
├── .env               ✅ Create this (not in git)
├── .gitignore         ✅ Add .env here
├── package.json       ✅ Already exists
└── src/
    └── index.js       ✅ Already exists
```

---

## 🔧 CLI Commands

### Deploy & Manage:

```bash
# Push code (deploy)
space push

# View logs
space logs

# Open in browser
space open

# View app info
space info

# List all projects
space projects

# Delete project
space delete
```

### Environment Variables:

```bash
# Set variable
space env add VARIABLE_NAME value

# List variables
space env ls

# Remove variable
space env rm VARIABLE_NAME

# Pull .env file
space env pull
```

### Releases:

```bash
# Create new release
space release

# List releases
space releases

# Promote release
space release --promote <release-id>
```

---

## 🌐 Custom Domain

### Add Domain:

```bash
# Add custom domain
space domains add api.yourdomain.com

# Deta will give you CNAME record
```

### DNS Settings:

Add CNAME record at your domain registrar:
```
CNAME api <your-app-id>.deta.app
```

### SSL:

- Auto-generated
- Free
- Renews automatically

---

## 📊 Monitoring

### Real-time Logs:

```bash
# Stream logs
space logs --follow

# Last 100 lines
space logs --tail 100

# Filter by level
space logs --level error
```

### Metrics:

- Dashboard: https://deta.space
- View requests, errors, latency
- No limits on free tier!

---

## ⚡ Performance

### From Vietnam:

- **Latency:** ~100-150ms (Singapore server)
- **Uptime:** 99.9%+
- **No cold starts** on free tier
- **Global CDN** included

### Optimization:

Already optimized in code:
```javascript
// Compression
app.use(compression());

// Caching
const cache = new NodeCache({ stdTTL: 600 });
```

---

## 🔒 Security

### Environment Variables:

- Encrypted at rest
- Not visible in logs
- Secure in Spacefile

### HTTPS:

- Force HTTPS enabled
- Free SSL certificate
- Auto renewal

### Secrets Management:

```bash
# Add secret (not in Spacefile)
space secrets add API_KEY value

# List secrets
space secrets ls
```

---

## 💰 Pricing

### Free Tier (Forever):

- ✅ **Unlimited** apps
- ✅ **Unlimited** requests
- ✅ **Unlimited** bandwidth
- ✅ **10 GB** storage per app
- ✅ **No credit card** required
- ✅ **No hidden fees**

### Builder Plan ($5/month):

- Everything in Free
- Priority support
- Advanced features
- Team collaboration

**For personal projects: FREE is enough!**

---

## 🐛 Troubleshooting

### Build Failed:

```bash
# Test locally first
npm install
npm start

# Check logs
space logs

# Verify Spacefile
cat Spacefile
```

### Port Issues:

Deta expects port `8080`:

```javascript
// src/index.js
const PORT = process.env.PORT || 8080;
```

### Environment Variables:

```bash
# Verify .env file
cat .env

# Push with .env
space push

# Or set individually
space env add KEY value
```

### Deployment Stuck:

```bash
# Cancel current deployment
Ctrl+C

# Try again
space push --force
```

---

## 🔄 CI/CD Integration

### GitHub Actions:

```yaml
# .github/workflows/deploy.yml
name: Deploy to Deta

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Install Deta CLI
        run: |
          curl -fsSL https://get.deta.dev/space-cli.sh | sh
          
      - name: Deploy
        env:
          DETA_ACCESS_TOKEN: ${{ secrets.DETA_ACCESS_TOKEN }}
        run: |
          cd backend
          space push
```

---

## 📝 Checklist

### Setup:
- [x] Deta CLI installed
- [x] Logged in (`space login`)
- [x] Spacefile created
- [ ] `.env` file created with API keys
- [ ] `.env` added to `.gitignore`

### Deploy:
- [ ] `space push` successful
- [ ] `space release` created
- [ ] Health check OK
- [ ] API endpoints working

### Frontend:
- [ ] Copy Deta URL
- [ ] Update `.env.production`
- [ ] Deploy frontend
- [ ] Test full stack

---

## 🎯 Best Practices

1. **Use .env for secrets:**
   ```bash
   # Don't commit .env
   echo ".env" >> .gitignore
   ```

2. **Version your releases:**
   ```bash
   space release --notes "v1.0.0 - Initial release"
   ```

3. **Monitor logs:**
   ```bash
   space logs --follow
   ```

4. **Test locally first:**
   ```bash
   npm start
   # Then deploy
   space push
   ```

---

## 🔗 Links

- **Dashboard:** https://deta.space
- **Docs:** https://deta.space/docs
- **CLI Reference:** https://deta.space/docs/cli
- **Discord:** https://go.deta.dev/discord
- **Status:** https://status.deta.space

---

## 🎉 Next Steps

1. ✅ Deploy successful

2. ✅ Copy your Deta Space URL:
   ```
   https://blockchain-apps-api-1-a1234567.deta.app
   ```

3. ✅ Update frontend `.env.production`:
   ```env
   NEXT_PUBLIC_API_URL=https://your-app.deta.app
   ```

4. ✅ Deploy frontend to Vercel

5. ✅ Test!

---

**Deta Space URL:** `https://your-app.deta.app`

Nhanh nhất cho VN, miễn phí vĩnh viễn! 🚀
