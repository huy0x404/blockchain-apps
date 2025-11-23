# 🚀 Deploy Backend to Fly.io

## ✅ Tại sao chọn Fly.io?

- ✅ **KHÔNG SLEEP** - Always on
- ✅ **Server Singapore** - Ping thấp từ VN (~50ms)
- ✅ **3 VMs free** - 256MB RAM each
- ✅ **160GB bandwidth/month** free
- ✅ **PostgreSQL free** - 3GB storage
- ✅ **Global CDN** - Deploy gần users
- ✅ **Docker-based** - Flexible

**Nhược điểm:**
- ⚠️ Cần credit card (không charge nếu trong free tier)
- 📝 CLI hơi phức tạp

---

## 🎯 Quick Start

### Bước 1: Install Fly CLI

#### Windows (PowerShell):
```powershell
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

#### Mac/Linux:
```bash
curl -L https://fly.io/install.sh | sh
```

#### Verify:
```bash
fly version
```

### Bước 2: Login

```bash
fly auth login
```

Browser tự động mở → Login → Verify email → Add credit card

**Note:** Credit card bắt buộc nhưng không charge nếu trong free tier!

### Bước 3: Launch App

```bash
cd backend

# Launch interactive setup
fly launch

# Prompts:
# - App name: blockchain-apps-api
# - Region: Singapore (sin)
# - PostgreSQL: No
# - Redis: No
# - Deploy now: Yes

# Fly tự động:
# 1. Create fly.toml
# 2. Create Dockerfile (nếu chưa có)
# 3. Build & deploy
```

### Bước 4: Add Secrets

```bash
# Add environment variables as secrets
fly secrets set \
  NODE_ENV=production \
  ETHERSCAN_API_KEY=your_key \
  ZAN_API_KEY=your_key \
  ZAN_API_URL=your_url \
  COINMARKETCAP_API_KEY=your_key \
  RATE_LIMIT_WINDOW_MS=900000 \
  RATE_LIMIT_MAX_REQUESTS=100

# App auto-restarts với secrets mới
```

### Bước 5: Get URL

```bash
fly status

# Your URL:
# https://blockchain-apps-api.fly.dev
```

---

## 📁 Files cần thiết

### ✅ `fly.toml` (đã tạo sẵn)

```toml
app = "blockchain-apps-api"
primary_region = "sin"

[build]
  builder = "heroku/buildpacks:20"

[env]
  NODE_ENV = "production"
  PORT = "8080"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = false
  auto_start_machines = false
  min_machines_running = 1

[[services]]
  protocol = "tcp"
  internal_port = 8080

  [[services.ports]]
    port = 80
    handlers = ["http"]

  [[services.ports]]
    port = 443
    handlers = ["tls", "http"]

  [[services.tcp_checks]]
    interval = "15s"
    timeout = "2s"
```

### ✅ Dockerfile (Optional - Fly auto-generates)

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
```

---

## 🚀 Deploy & Management

### Deploy:

```bash
# Deploy changes
fly deploy

# Deploy specific region
fly deploy --region sin

# Deploy with build args
fly deploy --build-arg NODE_ENV=production
```

### Scale:

```bash
# Scale VMs
fly scale count 2

# Scale VM size
fly scale vm shared-cpu-1x

# Scale memory
fly scale memory 512

# Auto scale
fly autoscale set min=1 max=3
```

### Regions:

```bash
# Add region
fly regions add sin tyo

# Remove region
fly regions remove fra

# List regions
fly regions list

# Set primary
fly regions set sin
```

---

## 🔧 CLI Commands

### App Management:

```bash
# View app info
fly info

# View status
fly status

# Open in browser
fly open

# SSH into VM
fly ssh console

# View dashboard
fly dashboard
```

### Logs:

```bash
# Stream logs
fly logs

# Last 100 lines
fly logs --tail 100

# Filter by app
fly logs -a blockchain-apps-api
```

### Secrets:

```bash
# Set secret
fly secrets set KEY=value

# List secrets (names only)
fly secrets list

# Unset secret
fly secrets unset KEY

# Import from .env
fly secrets import < .env
```

### Database (Optional):

```bash
# Create PostgreSQL
fly postgres create

# Attach to app
fly postgres attach my-postgres-db

# Connect
fly postgres connect

# Backup
fly postgres backup
```

---

## 💰 Pricing

### Free Tier (Hobby):
- ✅ **3 shared-cpu-1x VMs** (256MB RAM)
- ✅ **160GB bandwidth/month**
- ✅ **3GB PostgreSQL** storage
- ✅ **No sleep**
- ⚠️ Credit card required

**Ước tính:**
- 1 VM 256MB: ~$1.94/month
- 160GB bandwidth: Free
- 3GB PostgreSQL: Free
- **Total: ~$2-3/month** (nếu vượt free tier)

### Pay as you go:
- Shared CPU 1x: $0.0000008/sec (~$1.94/month)
- Shared CPU 2x: $0.0000016/sec
- Bandwidth: $0.02/GB (sau 160GB free)

---

## 🌍 Regions tốt cho VN

```bash
# Best regions cho VN (theo thứ tự):
sin  # Singapore - BEST (~50ms)
hkg  # Hong Kong (~100ms)
nrt  # Tokyo (~150ms)
syd  # Sydney (~200ms)
```

Set primary region:
```bash
fly regions set sin
```

---

## 📊 Monitoring

### Metrics:

```bash
# View metrics
fly metrics

# Specific metrics
fly metrics --app blockchain-apps-api
```

### Dashboard:
- https://fly.io/dashboard
- Request rate
- Response time
- CPU/Memory usage
- Deployment history

### Alerts:

Set up via dashboard:
- Email notifications
- Slack integration
- Webhook alerts

---

## 🔒 Security

### HTTPS:
- Auto SSL certificates
- Force HTTPS enabled
- Let's Encrypt integration

### Secrets:
- Encrypted at rest
- Never logged
- Scoped per app

### Private Networking:

```toml
# fly.toml
[experimental]
  private_network = true
```

### Firewall:

```bash
# Only allow HTTPS
fly ips allocate-v4 --shared
```

---

## 🐛 Troubleshooting

### Build Failed:

```bash
# View build logs
fly logs --build

# Rebuild
fly deploy --no-cache

# Test Dockerfile locally
docker build -t test .
docker run -p 8080:8080 test
```

### App Crashed:

```bash
# View logs
fly logs

# Restart app
fly apps restart

# SSH into VM
fly ssh console

# Check processes
fly ssh console -C "ps aux"
```

### Out of Memory:

```bash
# Scale memory
fly scale memory 512

# Or upgrade VM
fly scale vm shared-cpu-2x
```

### Slow Response:

1. Check region: `fly regions list`
2. Add more regions: `fly regions add sin hkg`
3. Scale VMs: `fly scale count 2`

---

## 🎯 Best Practices

1. **Use fly.toml:**
   ```bash
   # Version control your config
   git add fly.toml
   ```

2. **Health checks:**
   ```toml
   [[services.tcp_checks]]
     interval = "15s"
     timeout = "2s"
   ```

3. **Graceful shutdown:**
   ```javascript
   process.on('SIGTERM', () => {
     server.close(() => process.exit(0));
   });
   ```

4. **Monitor costs:**
   ```bash
   fly billing show
   ```

---

## 📝 Checklist

- [ ] Fly CLI installed
- [ ] Account created + credit card added
- [ ] App launched
- [ ] Region set to Singapore
- [ ] Secrets added
- [ ] Health check working
- [ ] Monitor usage

---

## 🔗 Links

- **Dashboard:** https://fly.io/dashboard
- **Docs:** https://fly.io/docs
- **Pricing:** https://fly.io/docs/about/pricing
- **Status:** https://status.flyio.net
- **Community:** https://community.fly.io

---

**Fly.io URL:** `https://blockchain-apps-api.fly.dev`

Global, fast, powerful! ✈️
