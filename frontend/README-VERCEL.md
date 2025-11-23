# 🚀 Deploy Frontend to Vercel

## Prerequisites

✅ Backend deployed to Render
✅ Backend URL ready (e.g., `https://blockchain-apps-api.onrender.com`)

---

## Quick Start

### 1. Update Environment Variables

Create `.env.local` in frontend folder:

```bash
cd frontend
echo NEXT_PUBLIC_API_URL=https://blockchain-apps-api.onrender.com > .env.local
```

Replace with your actual Render backend URL!

### 2. Push to GitHub

```bash
cd frontend
git init
git add .
git commit -m "Frontend ready for Vercel"
git remote add origin https://github.com/YOUR_USERNAME/blockchain-apps.git
git push -u origin main
```

### 3. Deploy on Vercel

#### Option A: Vercel Dashboard (Recommended)

1. **Truy cập Vercel:**
   - https://vercel.com
   - Sign up with GitHub

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import Git Repository
   - Select `blockchain-apps` repository

3. **Configure Project:**
   ```
   Framework Preset: Next.js
   Root Directory: frontend
   Build Command: npm run build (auto-detected)
   Output Directory: .next (auto-detected)
   Install Command: npm install (auto-detected)
   ```

4. **Environment Variables:**
   Click "Environment Variables" → Add:
   ```
   Name: NEXT_PUBLIC_API_URL
   Value: https://blockchain-apps-api.onrender.com
   ```
   *(Replace with your Render backend URL)*

5. **Deploy:**
   - Click "Deploy"
   - Wait ~2 minutes

#### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel --prod

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? blockchain-apps-frontend
# - Directory? ./
# - Override settings? No
```

### 4. Get Your Frontend URL

After deployment:
```
https://blockchain-apps-frontend.vercel.app
```

Or custom domain:
```
https://your-domain.com
```

---

## Testing Frontend

### 1. Open in Browser:
```
https://blockchain-apps-frontend.vercel.app
```

### 2. Check Pages:
- ✅ Dashboard → Market overview loads
- ✅ Whale Tracker → Wallet data displays
- ✅ DeFi Analytics → Protocol list shows
- ✅ Airdrop Finder → Active airdrops appear

### 3. Check Console:
- Open DevTools (F12)
- Console tab
- Should see: `API URL: https://blockchain-apps-api.onrender.com`
- No CORS errors

### 4. Check Network:
- DevTools → Network tab
- Filter: XHR/Fetch
- Verify API calls to Render backend

---

## Environment Variables

### Required:
```env
NEXT_PUBLIC_API_URL=https://blockchain-apps-api.onrender.com
```

### How to Add/Update on Vercel:

1. **Dashboard Method:**
   - Project Settings → Environment Variables
   - Add/Edit variable
   - Redeploy to apply

2. **CLI Method:**
   ```bash
   vercel env add NEXT_PUBLIC_API_URL
   # Enter value: https://blockchain-apps-api.onrender.com
   
   # Redeploy
   vercel --prod
   ```

---

## Auto-Deploy from GitHub

Vercel auto-deploys on every push:

```bash
# Make changes
git add .
git commit -m "Update frontend"
git push origin main

# Vercel auto-deploys in ~1 minute
```

### Deploy Previews:

- **Production:** `main` branch → `blockchain-apps-frontend.vercel.app`
- **Preview:** Other branches → `blockchain-apps-frontend-git-branch.vercel.app`

---

## Custom Domain

### 1. Add Domain in Vercel:
- Project Settings → Domains
- Add Domain: `yourdomain.com`

### 2. Configure DNS:
- Add DNS records at your domain registrar:
  ```
  A     @      76.76.21.21
  CNAME www    cname.vercel-dns.com
  ```

### 3. SSL Certificate:
- Auto-issued by Vercel
- Usually ready in 1-2 minutes

---

## Performance Optimization

### Already Configured:

✅ **Next.js Config:**
```javascript
// next.config.js
{
  swcMinify: true,              // Fast minification
  compiler: {
    removeConsole: true,        // Remove console.logs in production
  },
  images: {
    formats: ['image/webp'],    // Optimized images
  }
}
```

✅ **Vercel Config:**
```json
// vercel.json
{
  "regions": ["sin1"],          // Singapore region
  "headers": [...]              // Security headers
}
```

### Analytics (Optional):

```bash
# Enable Vercel Analytics
npm install @vercel/analytics

# Add to _app.jsx:
import { Analytics } from '@vercel/analytics/react';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
```

---

## Monitoring

### Vercel Dashboard:
- **Deployments:** History, logs, status
- **Analytics:** Page views, visitors
- **Speed Insights:** Core Web Vitals
- **Logs:** Real-time function logs

### Real-time Logs:
```bash
vercel logs --follow
```

---

## Troubleshooting

### Build Failed:

```bash
# Test build locally
npm run build

# Check errors
npm run lint

# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### API Not Working:

1. Check environment variable:
   ```javascript
   // Add to any page to debug
   console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);
   ```

2. Verify CORS on backend:
   ```javascript
   // backend/src/index.js
   app.use(cors({
     origin: ['https://blockchain-apps-frontend.vercel.app']
   }));
   ```

3. Test API directly:
   ```bash
   curl https://blockchain-apps-api.onrender.com/health
   ```

### Slow Loading:

- Render free tier sleeps → First load slow (~30s)
- Solution: Upgrade Render to Starter ($7/mo)
- Or: Use Railway/Fly.io (no sleep on free tier)

### 404 Errors:

- Check `next.config.js` rewrites
- Verify API URL format (no trailing slash)
- Check Vercel deployment logs

---

## Free Tier Limits

### Vercel Hobby (Free):
- ✅ **Unlimited** deployments
- ✅ **Unlimited** bandwidth
- ✅ **100 GB-hours** serverless function execution
- ✅ **Custom domains**
- ✅ **SSL certificates**
- ✅ **Preview deployments**

Perfect for personal projects! 🎉

---

## Next Steps

After deployment:

1. ✅ Test all pages
2. ✅ Check API integration
3. ✅ Add custom domain (optional)
4. ✅ Enable analytics (optional)
5. ✅ Share with users! 🚀

---

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Community: https://github.com/vercel/vercel/discussions
- Status: https://www.vercel-status.com

---

**Frontend URL:** https://blockchain-apps-frontend.vercel.app
**Backend URL:** https://blockchain-apps-api.onrender.com

All set! 🎉
