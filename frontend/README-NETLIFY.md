# 🚀 Deploy Frontend to Netlify

## ✅ Tại sao chọn Netlify?

- ✅ **MIỄN PHÍ** - 100GB bandwidth/month
- ✅ **Auto Deploy** - Từ GitHub
- ✅ **Global CDN** - Nhanh toàn cầu
- ✅ **Serverless Functions** - Built-in
- ✅ **Custom Domain** - Free SSL
- ✅ **Preview Deployments** - Mỗi PR
- ✅ **Next.js Support** - First-class

---

## 🎯 Quick Start (3 phút)

### Bước 1: Push to GitHub

```bash
cd frontend
git add .
git commit -m "Deploy to Netlify"
git push origin main
```

### Bước 2: Deploy trên Netlify

#### Option A: Netlify Dashboard (Recommended)

1. **Truy cập Netlify:**
   - https://app.netlify.com
   - Sign up with GitHub

2. **Import Project:**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify
   - Select repository: `blockchain-apps`

3. **Configure Build:**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: .next
   ```

4. **Environment Variables:**
   Click "Show advanced" → "New variable":
   ```
   NEXT_PUBLIC_API_URL=https://blockchain-apps-api.cyclic.app
   ```
   (Hoặc URL backend bạn đang dùng)

5. **Deploy:**
   - Click "Deploy site"
   - Đợi ~2-3 phút

6. **Get URL:**
   ```
   https://blockchain-apps-frontend.netlify.app
   ```

#### Option B: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Initialize
cd frontend
netlify init

# Follow prompts:
# - Create & configure a new site
# - Team: Your team
# - Site name: blockchain-apps-frontend
# - Build command: npm run build
# - Publish directory: .next

# Deploy
netlify deploy --prod
```

---

## 📁 Files cần thiết

### ✅ `netlify.toml` (đã tạo sẵn)

```toml
[build]
  command = "npm install && npm run build"
  publish = ".next"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
```

### ✅ `.env.production` (update)

```env
# Backend API URL
NEXT_PUBLIC_API_URL=https://your-backend-url
```

---

## 🔄 Auto Deploy

Netlify tự động deploy khi push:

```bash
# Make changes
git add .
git commit -m "Update frontend"
git push origin main

# Netlify auto-deploys in ~2 minutes
```

### Deploy Previews:

- **Production:** `main` branch → `your-site.netlify.app`
- **Preview:** Pull Requests → `deploy-preview-123--your-site.netlify.app`
- **Branch:** Other branches → `branch-name--your-site.netlify.app`

---

## ⚙️ Configuration

### Environment Variables:

**Dashboard:**
1. Site settings → Build & deploy → Environment
2. Add variable: `NEXT_PUBLIC_API_URL`
3. Save → Trigger deploy

**CLI:**
```bash
# Set env variable
netlify env:set NEXT_PUBLIC_API_URL https://your-backend-url

# List env variables
netlify env:list

# Import from .env
netlify env:import .env.production
```

### Custom Domain:

1. **Dashboard** → Domain settings → Add custom domain
2. Add domain: `yourdomain.com`
3. Configure DNS:
   ```
   # Apex domain
   A     @      75.2.60.5
   
   # Subdomain
   CNAME www    your-site.netlify.app
   ```
4. SSL certificate auto-issued (free)

### Redirects & Rewrites:

Already configured in `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

For API proxying:
```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url/api/:splat"
  status = 200
  force = true
```

---

## 📊 Dashboard Features

### Build & Deploy:

- **Build logs** - Real-time
- **Deploy history** - Rollback anytime
- **Deploy hooks** - Trigger via webhook
- **Build plugins** - Extend functionality

### Analytics (Optional):

```bash
# Enable Netlify Analytics ($9/month)
# Dashboard → Analytics → Enable

# Or use free alternatives:
# - Vercel Analytics
# - Google Analytics
# - Plausible
```

### Functions:

Create serverless functions:
```javascript
// netlify/functions/hello.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello from Netlify!' })
  };
};

// Access at: https://your-site.netlify.app/.netlify/functions/hello
```

---

## 🚀 Performance Optimization

### Next.js Config:

Already optimized in `next.config.js`:
```javascript
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  images: {
    formats: ['image/webp'],
  }
};
```

### Netlify Settings:

**Enable:**
- ✅ Asset optimization (minify CSS, JS)
- ✅ Image optimization
- ✅ Pretty URLs
- ✅ Instant cache invalidation

**Dashboard:**
Site settings → Build & deploy → Post processing

### Edge Functions (Beta):

```javascript
// netlify/edge-functions/geolocation.js
export default async (request, context) => {
  const country = context.geo.country.code;
  return new Response(`Hello from ${country}!`);
};
```

---

## 🔒 Security

### Headers:

Already configured in `netlify.toml`:
```toml
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
```

### Authentication:

```toml
# Password protect site
[[redirects]]
  from = "/*"
  to = "/.netlify/functions/auth"
  status = 200
  force = true
  conditions = {Role = ["admin"]}
```

### Environment Variables:

- Encrypted at rest
- Not visible in logs
- Can be scoped per context (production/preview)

---

## 📈 Monitoring

### Build Notifications:

**Email, Slack, Discord:**
1. Site settings → Build & deploy → Deploy notifications
2. Add notification → Choose service
3. Configure webhook/email

### Real-time Logs:

```bash
# CLI: Stream logs
netlify watch

# Or in Dashboard → Deploys → [Deploy] → View logs
```

### Status:

- **Build status:** https://www.netlifystatus.com
- **Deploy log:** Dashboard
- **Function logs:** Dashboard → Functions

---

## 💰 Pricing

### Free Tier (Starter):

- ✅ **100 GB** bandwidth/month
- ✅ **300** build minutes/month
- ✅ **Unlimited** sites
- ✅ **Custom domain** with SSL
- ✅ **Deploy previews**
- ✅ **Form submissions** (100/month)
- ✅ **Serverless functions** (125k requests/month)

### Pro ($19/month):

- Everything in Free
- 1TB bandwidth
- Unlimited build minutes
- Background functions
- Analytics included

**For personal projects: FREE is perfect!**

---

## 🐛 Troubleshooting

### Build Failed:

```bash
# Test build locally
cd frontend
npm install
npm run build

# Check build logs on Netlify dashboard
```

### Environment Variables not working:

1. Check variable name (must start with `NEXT_PUBLIC_`)
2. Redeploy after adding variables
3. Clear cache: Deploy settings → Clear cache & retry

### 404 on routes:

Update `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### API calls failing:

1. Check CORS on backend
2. Verify `NEXT_PUBLIC_API_URL` is set
3. Test API directly:
   ```bash
   curl https://your-backend-url/health
   ```

### Slow builds:

**Optimize:**
```toml
# netlify.toml
[build]
  command = "npm ci && npm run build"  # Use npm ci instead of npm install
  
[build.environment]
  NPM_FLAGS = "--legacy-peer-deps"
  NODE_OPTIONS = "--max_old_space_size=4096"
```

---

## 🔧 CLI Commands

### Deploy:

```bash
# Deploy to production
netlify deploy --prod

# Deploy preview
netlify deploy

# Deploy specific folder
netlify deploy --dir=.next --prod
```

### Site Management:

```bash
# List sites
netlify sites:list

# Open site in browser
netlify open

# Open admin dashboard
netlify open:admin

# Site info
netlify status
```

### Functions:

```bash
# Create function
netlify functions:create hello

# Test function locally
netlify dev

# Deploy functions
netlify deploy --prod
```

### Environment:

```bash
# Set variable
netlify env:set KEY value

# Get variable
netlify env:get KEY

# List all variables
netlify env:list

# Unset variable
netlify env:unset KEY
```

---

## 🎯 Best Practices

1. **Use netlify.toml:**
   - Version control your config
   - Consistent builds

2. **Environment variables:**
   ```bash
   # Never commit secrets
   echo ".env*" >> .gitignore
   ```

3. **Optimize images:**
   ```javascript
   // Use Next.js Image component
   import Image from 'next/image';
   ```

4. **Cache dependencies:**
   ```toml
   [build]
     command = "npm ci && npm run build"
   ```

5. **Monitor builds:**
   - Set up notifications
   - Check build time trends
   - Optimize when needed

---

## 🔗 Links

- **Dashboard:** https://app.netlify.com
- **Docs:** https://docs.netlify.com
- **CLI Docs:** https://cli.netlify.com
- **Community:** https://community.netlify.com
- **Status:** https://www.netlifystatus.com
- **Support:** https://answers.netlify.com

---

## 📝 Checklist

### Setup:
- [x] Netlify account created
- [x] Repository connected
- [ ] Build settings configured
- [ ] Environment variables added

### Deploy:
- [ ] Build successful
- [ ] Site accessible
- [ ] API calls working
- [ ] Custom domain added (optional)

### Optimization:
- [ ] Asset optimization enabled
- [ ] Image optimization enabled
- [ ] Build notifications set up
- [ ] Deploy previews working

---

## 🎉 Next Steps

After successful deploy:

1. ✅ Copy Netlify URL:
   ```
   https://blockchain-apps-frontend.netlify.app
   ```

2. ✅ Test all pages:
   - Dashboard
   - Whale Tracker
   - DeFi Analytics
   - Airdrop Finder

3. ✅ Check API integration

4. ✅ Add custom domain (optional)

5. ✅ Set up deploy notifications

---

## 🌟 Netlify vs Vercel

| Feature | Netlify | Vercel |
|---------|---------|--------|
| Free bandwidth | 100GB | Unlimited |
| Build minutes | 300/mo | Unlimited |
| Functions | 125k/mo | 100GB-hrs |
| Custom domains | ✅ | ✅ |
| Edge network | ✅ | ✅ |
| Next.js | ✅ Good | ✅ Best |
| Pricing | Free → $19 | Free → $20 |

**Both are excellent!** Choose based on preference:
- **Netlify:** Better for general static sites, more build control
- **Vercel:** Better for Next.js, unlimited bandwidth

---

**Netlify URL:** `https://your-site.netlify.app`

Fast, free, global! 🚀
