# Frontend for Blockchain Apps

Dashboard frontend cho các ứng dụng phân tích blockchain và DeFi.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.x
- Backend API server running

### Installation

```bash
npm install
```

### Configuration

Create `.env.local` file:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

Frontend sẽ chạy tại `http://localhost:3000`

## 📄 Pages

- `/` - Home page
- `/whale-tracker` - Whale Tracker dashboard
- `/airdrop-finder` - Airdrop Finder dashboard
- `/defi-analytics` - DeFi Analytics dashboard
- `/ai-analyzer` - AI Analyzer dashboard

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── pages/            # Next.js pages
│   ├── components/       # React components
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API services
│   ├── styles/           # Global styles
│   └── utils/            # Utilities
├── public/               # Static files
└── package.json
```

## 🎨 Tech Stack

- Next.js 14
- React 18
- TailwindCSS
- Chart.js / Recharts
- Axios
- SWR (data fetching)

## 📝 License

MIT
