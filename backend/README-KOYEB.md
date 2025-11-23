# 🚀 Deploy Backend to Koyeb

## ✅ Tại sao chọn Koyeb?

- ✅ **MIỄN PHÍ** - 2 web services free
- ✅ **KHÔNG SLEEP** - Always on
- ✅ **Server Singapore/Tokyo** - Nhanh từ VN
- ✅ **100GB bandwidth/month** free
- ✅ **Container-based** - Stable & secure
- ✅ **Auto scale** - Scale to zero
- ✅ **Git integration** - Auto deploy

---

## 🎯 Quick Start

### Bước 1: Push to GitHub

```bash
git add .
git commit -m "Deploy to Koyeb"
git push origin main
```

### Bước 2: Deploy on Koyeb

1. **Truy cập Koyeb:**
   - https://koyeb.com
   - Sign up (free, no credit card)

2. **Create App:**
   - Click "Create App"
   - Choose "GitHub"
   - Authorize Koyeb

3. **Configure Deployment:**
   ```
   Repository: blockchain-apps
   Branch: main
   Builder: Buildpack
   Build command: npm install
   Run command: npm start
   Port: 5000
   ```

4. **Environment Variables:**
   - Expand "Environment variables"
   - Add:
     ```
     NODE_ENV=production
     PORT=8000
     ETHERSCAN_API_KEY=your_key
     ZAN_API_KEY=your_key
     ZAN_API_URL=your_url
     COINMARKETCAP_API_KEY=your_key
     ```

5. **Deploy:**
   - Click "Deploy"
   - Wait ~3-5 minutes

6. **Get URL:**
   ```
   https://blockchain-apps-api-YOUR_ORG.koyeb.app
   ```

---

## 📁 Configuration

### Koyeb YAML (Optional):

Create `koyeb.yaml`:
```yaml
app: blockchain-apps
services:
  - name: api
    type: web
    git:
      branch: main
      workdir: backend
    instance_type: free
    ports:
      - port: 8000
        protocol: http
    env:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 8000
    build:
      command: npm install
    run:
      command: npm start
```

### Dockerfile (Alternative):

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
```

---

## 🔧 Features

### Auto Deploy:

```bash
# Push to trigger deploy
git push origin main

# Koyeb auto-deploys in ~3 minutes
```

### Regions:

Choose closest region:
- **Singapore** (sin) - Best cho VN
- **Tokyo** (tyo) - Good cho VN
- **Washington** (was)
- **Frankfurt** (fra)

### Scaling:

```yaml
# Auto scale config
services:
  - name: api
    scaling:
      min: 1
      max: 3
    regions:
      - sin
```

### Health Checks:

```yaml
health_checks:
  - path: /health
    port: 8000
    interval: 30s
    timeout: 5s
    grace_period: 30s
```

---

## 💰 Pricing

### Free Tier:
- ✅ **2 web services**
- ✅ **2 database instances**
- ✅ **100GB bandwidth/month**
- ✅ **512MB RAM** per service
- ✅ **No credit card** required

### Starter ($5.50/month):
- Everything in Free
- 4 web services
- 1GB RAM
- Priority support

---

## 🚀 CLI

```bash
# Install Koyeb CLI
npm install -g @koyeb/koyeb-cli

# Login
koyeb login

# List apps
koyeb apps list

# Deploy
koyeb app create blockchain-apps \
  --git github.com/YOUR_USERNAME/blockchain-apps \
  --git-branch main \
  --git-workdir backend \
  --ports 8000:http \
  --routes /:8000 \
  --env NODE_ENV=production

# View logs
koyeb service logs blockchain-apps/api

# Redeploy
koyeb service redeploy blockchain-apps/api
```

---

## 📊 Monitoring

### Dashboard:
- Deployment status
- Resource usage (CPU, RAM)
- Request metrics
- Logs streaming

### Metrics:
- HTTP requests
- Response time
- Error rate
- Bandwidth usage

---

## 🔒 Security

### HTTPS:
- Auto SSL certificate
- Force HTTPS
- Free & automatic

### Environment Variables:
- Encrypted storage
- Secret values hidden
- Scoped per service

### Private Services:

```yaml
# Make service private
services:
  - name: api
    type: web
    private: true
```

---

## 🐛 Troubleshooting

### Build Failed:

1. Check build logs in dashboard
2. Verify `package.json` scripts
3. Test locally:
   ```bash
   npm install
   npm start
   ```

### Port Issues:

Koyeb expects app to listen on `PORT` env variable:
```javascript
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0');
```

### Out of Bandwidth:

- Monitor usage in dashboard
- Optimize API responses
- Enable compression
- Consider upgrade

---

## 🎯 Best Practices

1. **Health Checks:**
   ```javascript
   app.get('/health', (req, res) => {
     res.json({ status: 'healthy' });
   });
   ```

2. **Graceful Shutdown:**
   ```javascript
   process.on('SIGTERM', () => {
     server.close(() => process.exit(0));
   });
   ```

3. **Logging:**
   - Use structured logs
   - Log to stdout/stderr
   - Koyeb auto-collects logs

4. **Environment Variables:**
   - Never commit secrets
   - Use Koyeb secrets
   - Different values per environment

---

## 📝 Checklist

- [x] Koyeb account created
- [x] GitHub repository ready
- [ ] App created on Koyeb
- [ ] Environment variables set
- [ ] Health check endpoint added
- [ ] Deployment successful
- [ ] Domain configured (optional)

---

## 🔗 Links

- **Dashboard:** https://app.koyeb.com
- **Docs:** https://koyeb.com/docs
- **CLI:** https://github.com/koyeb/koyeb-cli
- **Status:** https://status.koyeb.com
- **Community:** https://community.koyeb.com

---

**Koyeb URL:** `https://blockchain-apps-api-YOUR_ORG.koyeb.app`

Fast, stable, no sleep! 🚀
