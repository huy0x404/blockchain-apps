# 🚀 Blockchain Apps Monorepo

Monorepo chứa các ứng dụng phân tích blockchain và DeFi analytics với Backend (Node.js/Express) và Frontend (React/Next.js).

## 📦 Các sản phẩm

### 1. **Whale Tracker Bot** (5-7 ngày)
- Theo dõi ví "cá mập" (ví có giao dịch lớn)
- Hiển thị và gửi cảnh báo khi có giao dịch lớn (buy/sell/token swap)
- Dashboard hiển thị top ví hoạt động nhiều nhất
- **APIs**: Etherscan API, Alchemy API, Telegram Bot API

### 2. **Airdrop Finder** (7-10 ngày)
- Quét các chain / dự án đang có airdrop
- Hiển thị điều kiện claim và thời hạn
- Gợi ý dự án tiềm năng, cập nhật claim tự động
- **APIs**: DeFiLlama API, CoinGecko API, Twitter API

### 3. **DeFi Analytics Dashboard** (10-14 ngày)
- Phân tích dữ liệu DeFi: TVL, volume, yield, pools
- So sánh top protocols (Uniswap, Aave, Curve...)
- Biểu đồ trực quan bằng Chart.js / Recharts
- **APIs**: DeFiLlama API, Dexscreener API, CoinMarketCap API

### 4. **AI On-chain Analyzer** (14+ ngày)
- Dùng AI phân tích dữ liệu on-chain
- Dự đoán hành vi ví, biến động token
- Tự sinh báo cáo dạng dashboard + mô tả insight bằng AI
- **APIs**: Dune API, Dexscreener API, OpenAI API

## 🏗️ Cấu trúc dự án

```
blockchain-apps/
├── backend/          # Node.js + Express API server
├── frontend/         # React/Next.js dashboard
└── docs/            # Tài liệu dự án
```

## 🚀 Quick Start

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Cấu hình API keys trong file .env
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🔧 Tech Stack

### Backend
- Node.js + Express
- MongoDB (Mongoose)
- Telegram Bot API
- Rate limiting & caching (Redis)

### Frontend
- React / Next.js
- TailwindCSS
- Chart.js / Recharts
- Axios

## 📚 Documentation

Xem thêm tài liệu chi tiết trong thư mục `/docs`:
- [API Structure](./docs/API_STRUCTURE.md)
- [Roadmap](./docs/ROADMAP.md)

## ✅ Ưu điểm thiết kế

- ✅ Dễ mở rộng từng module mà không ảnh hưởng nhau
- ✅ Có thể deploy backend/frontend tách biệt (Render + Vercel)
- ✅ Cấu trúc dùng lại 90% code giữa các sản phẩm
- ✅ Hỗ trợ tích hợp AI, Telegram bot, và API blockchain linh hoạt

## 📄 License

MIT
