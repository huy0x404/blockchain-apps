# Backend for Blockchain Apps

Backend API server cho các ứng dụng phân tích blockchain và DeFi.

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.x
- MongoDB >= 5.x
- Redis (optional, for caching)

### Installation

```bash
npm install
```

### Configuration

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Cấu hình API keys trong file `.env`:
   - Etherscan API Key
   - Alchemy/Infura API Key
   - Telegram Bot Token
   - OpenAI API Key
   - Và các API keys khác

### Running

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server sẽ chạy tại `http://localhost:5000`

## 📚 API Endpoints

### Whale Tracker
- `GET /api/whale/whales` - Get all whale wallets
- `GET /api/whale/track/:address` - Track specific wallet
- `GET /api/whale/transactions/recent` - Get recent whale transactions
- `GET /api/whale/analyze/:address` - Analyze wallet

### Airdrop Finder
- `GET /api/airdrop` - Get all airdrops
- `GET /api/airdrop/active` - Get active airdrops
- `GET /api/airdrop/upcoming` - Get upcoming airdrops
- `GET /api/airdrop/search/twitter` - Search airdrops from Twitter
- `POST /api/airdrop` - Create new airdrop
- `PUT /api/airdrop/:id` - Update airdrop
- `DELETE /api/airdrop/:id` - Delete airdrop

### DeFi Analytics
- `GET /api/defi/protocols` - Get all DeFi protocols
- `GET /api/defi/protocols/top` - Get top protocols by TVL
- `GET /api/defi/protocols/:name` - Get protocol details
- `GET /api/defi/tvl` - Get total TVL
- `GET /api/defi/chains` - Get all chains
- `GET /api/defi/pools` - Get yield pools
- `GET /api/defi/search` - Search tokens

### AI Analyzer
- `GET /api/ai/wallet/:address` - Analyze wallet with AI
- `GET /api/ai/token/:chain/:address` - Analyze token with AI
- `POST /api/ai/insights` - Generate market insights
- `GET /api/ai/predict/:address` - Predict wallet behavior

## 🤖 Telegram Bot

Bot sẽ tự động khởi động khi server start (nếu đã cấu hình TELEGRAM_BOT_TOKEN).

### Bot Commands
- `/start` - Khởi động bot
- `/watch <address>` - Theo dõi ví
- `/unwatch <address>` - Ngừng theo dõi ví
- `/list` - Hiển thị danh sách ví đang theo dõi
- `/track <address>` - Xem thông tin ví
- `/stats` - Thống kê bot

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── api/              # API integrations
│   ├── bots/             # Telegram bots
│   ├── controllers/      # Business logic
│   ├── routes/           # API routes
│   ├── models/           # Database models
│   ├── services/         # Shared services
│   ├── utils/            # Utilities
│   ├── config/           # Configuration
│   └── index.js          # Entry point
└── package.json
```

## 📝 License

MIT
