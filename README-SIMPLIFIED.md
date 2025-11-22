# Blockchain Apps - Simplified Version

## Thay đổi chính

Ứng dụng đã được đơn giản hóa bằng cách loại bỏ:
- ❌ **Database** (MongoDB, Redis) - không lưu trữ dữ liệu
- ❌ **Telegram Bot** - không gửi thông báo
- ❌ **AI/OpenAI** - không phân tích bằng AI
- ❌ **Twitter API** - không tìm kiếm trên Twitter

## Các tính năng còn lại

✅ **Chỉ sử dụng API để lấy và hiển thị dữ liệu:**

### 1. DeFi Analytics
- Lấy danh sách protocols từ DefiLlama
- Xem TVL (Total Value Locked)
- Xem thông tin chains
- Tìm kiếm token trên DEX
- Xem cặp giao dịch

### 2. Whale Tracker
- Theo dõi ví whale qua Etherscan API
- Xem số dư và giao dịch
- Phân tích hoạt động ví

### 3. Airdrop Finder
- Hiển thị danh sách airdrop (từ cache)
- Lọc theo trạng thái
- Xem chi tiết airdrop

## Cấu trúc Backend

```
backend/
├── src/
│   ├── index.js              # Server chính (không có DB)
│   ├── config/
│   │   └── env.js           # Cấu hình (đã xóa DB, Telegram, AI)
│   ├── controllers/
│   │   ├── defiController.js    # Chỉ gọi API
│   │   ├── whaleController.js   # Chỉ gọi API
│   │   └── airdropController.js # Chỉ dùng cache
│   ├── api/
│   │   ├── defiLlama.js
│   │   ├── dexScreener.js
│   │   └── etherscan.js
│   └── services/
│       └── cacheService.js  # In-memory cache
└── package.json             # Đã xóa mongoose, telegram, openai
```

## Cài đặt

### Backend

```bash
cd backend
npm install
```

### Cấu hình

Tạo file `.env` từ `.env.example`:

```bash
cp .env.example .env
```

Chỉ cần cấu hình các API keys sau:

```env
# Blockchain APIs
ETHERSCAN_API_KEY=your_key_here

# DeFi APIs (optional)
DEFILLAMA_API_KEY=your_key_here
DEXSCREENER_API_KEY=your_key_here
```

### Chạy Backend

```bash
npm start
# hoặc
npm run dev
```

Server sẽ chạy tại: `http://localhost:5000`

## API Endpoints

### DeFi
- `GET /api/defi/protocols` - Danh sách protocols
- `GET /api/defi/protocols/top` - Top protocols
- `GET /api/defi/tvl` - Total TVL
- `GET /api/defi/chains` - Danh sách chains
- `GET /api/defi/search?query=...` - Tìm kiếm token
- `GET /api/defi/pairs/:chain/:address` - Cặp giao dịch

### Whale Tracker
- `GET /api/whale/whales` - Danh sách whale (từ cache)
- `GET /api/whale/track/:address` - Theo dõi ví
- `GET /api/whale/analyze/:address` - Phân tích ví
- `GET /api/whale/transactions/recent` - Giao dịch gần đây

### Airdrop
- `GET /api/airdrop` - Tất cả airdrop
- `GET /api/airdrop/active` - Airdrop đang active
- `GET /api/airdrop/upcoming` - Airdrop sắp tới
- `GET /api/airdrop/:id` - Chi tiết airdrop

## Frontend

Frontend đã được cập nhật:
- Xóa endpoint AI
- Xóa các tính năng Twitter search
- Xóa CRUD operations cho airdrop

### Chạy Frontend

```bash
cd frontend
npm install
npm run dev
```

## Lưu ý

1. **Không có database**: Dữ liệu chỉ được cache tạm thời trong memory
2. **Không có persistence**: Khi restart server, cache sẽ mất
3. **API rate limits**: Cần tuân thủ rate limit của các API bên thứ 3
4. **Chỉ read-only**: Không thể tạo/sửa/xóa dữ liệu

## Dependencies còn lại

```json
{
  "express": "^4.18.2",
  "dotenv": "^16.3.1",
  "cors": "^2.8.5",
  "axios": "^1.6.0",
  "node-cache": "^5.1.2",
  "winston": "^3.11.0",
  "express-rate-limit": "^7.1.5",
  "helmet": "^7.1.0",
  "compression": "^1.7.4",
  "web3": "^4.3.0",
  "ethers": "^6.9.0"
}
```

## Kết luận

Ứng dụng bây giờ đơn giản hơn rất nhiều:
- Không cần setup database
- Không cần Telegram bot
- Không cần OpenAI API key
- Chỉ cần API keys cho blockchain/DeFi services
- Dễ dàng deploy và maintain
