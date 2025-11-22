# Blockchain Apps - Sử dụng 3 API có sẵn

## API Đang Sử Dụng

### 1. **Etherscan API** 🔗
- Chức năng: Theo dõi whale wallets, transactions, balances
- Endpoints:
  - Lấy balance của ví
  - Xem lịch sử giao dịch
  - Token transfers
  - Gas price
  
### 2. **ZAN API** 🌐
- Chức năng: Web3 infrastructure (thay thế Alchemy/Infura)
- Endpoints:
  - JSON-RPC calls
  - Get balance, transactions
  - Smart contract interactions
  - Block data

### 3. **CoinMarketCap API** 💰
- Chức năng: Giá crypto, market data
- Endpoints:
  - Top coins listing
  - Price quotes
  - Market metrics
  - Search tokens
  - Trending coins

## Cấu Trúc API Backend

```
backend/src/
├── api/
│   ├── etherscan.js       # Etherscan API client
│   ├── zan.js             # ZAN Web3 provider
│   ├── coinmarketcap.js   # CoinMarketCap API client
│   ├── defiLlama.js       # Wrapper using CoinMarketCap
│   └── dexScreener.js     # Wrapper using CoinMarketCap
├── controllers/
│   ├── defiController.js  # DeFi endpoints
│   ├── whaleController.js # Whale tracking
│   └── airdropController.js
└── routes/
    ├── defiRoutes.js
    ├── whaleRoutes.js
    └── airdropRoutes.js
```

## API Endpoints

### DeFi Analytics (CoinMarketCap)
```
GET /api/defi/protocols          - Top coins (market cap)
GET /api/defi/protocols/top      - Top protocols
GET /api/defi/protocols/:name    - Coin details
GET /api/defi/tvl                - Total market cap
GET /api/defi/chains             - Chain list
GET /api/defi/prices?coins=...   - Coin prices
GET /api/defi/search?query=...   - Search tokens
GET /api/defi/pairs/:chain/:addr - Token pairs
```

### Whale Tracker (Etherscan + ZAN)
```
GET /api/whale/whales            - Whale wallets list
GET /api/whale/track/:address    - Track wallet
GET /api/whale/analyze/:address  - Analyze wallet
GET /api/whale/transactions/recent - Recent transactions
```

### Airdrop Finder (Cache)
```
GET /api/airdrop                 - All airdrops
GET /api/airdrop/active          - Active airdrops
GET /api/airdrop/upcoming        - Upcoming airdrops
GET /api/airdrop/:id             - Airdrop details
```

## Cài Đặt

### 1. Cấu Hình Environment

Tạo file `.env`:
```bash
cd backend
cp .env.example .env
```

Điền API keys vào `.env`:
```env
# Etherscan
ETHERSCAN_API_KEY=your_actual_key_here

# ZAN
ZAN_API_KEY=your_actual_key_here
ZAN_API_URL=https://api.zan.top/node/v1/eth/mainnet/your_api_key

# CoinMarketCap
COINMARKETCAP_API_KEY=your_actual_key_here
```

### 2. Cài Đặt Dependencies

```bash
cd backend
npm install
```

### 3. Chạy Backend

```bash
npm start
# hoặc
npm run dev
```

Server chạy tại: `http://localhost:5000`

### 4. Chạy Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend chạy tại: `http://localhost:3000`

## Tính Năng

### ✅ Hoạt động đầy đủ với 3 API
- **Whale Tracking**: Etherscan + ZAN
- **Market Data**: CoinMarketCap
- **Token Info**: CoinMarketCap
- **Price Data**: CoinMarketCap

### ⚠️ Hạn chế (do không có DefiLlama/DexScreener)
- Không có TVL thực tế của protocols (dùng market cap thay thế)
- Không có yield pools data
- Không có DEX pairs chi tiết
- Không có liquidity pool data

### 🔄 Workarounds
- **TVL** → Dùng Total Market Cap (CMC)
- **Protocols** → Dùng Top Coins (CMC)
- **DEX Pairs** → Dùng Token Quotes (CMC)
- **Prices** → Dùng CMC Quotes

## Test API

### Test Etherscan
```bash
curl http://localhost:5000/api/whale/track/0x123...
```

### Test CoinMarketCap
```bash
curl http://localhost:5000/api/defi/protocols/top
curl http://localhost:5000/api/defi/search?query=bitcoin
```

### Test ZAN (qua Whale endpoints)
```bash
curl http://localhost:5000/api/whale/analyze/0x123...
```

## Rate Limits

- **Etherscan Free**: 5 calls/second
- **ZAN**: Tùy plan đăng ký
- **CoinMarketCap Free**: 333 calls/day (~10k credits/month)

## Lưu Ý Quan Trọng

1. **CoinMarketCap API Key** cần activate sau khi đăng ký
2. **ZAN API URL** phải include API key trong URL
3. **Etherscan** có rate limit, cần cache data
4. Sử dụng **in-memory cache** để giảm API calls

## Frontend Pages

- `/` - Dashboard
- `/whale-tracker` - Whale tracking
- `/airdrop-finder` - Airdrop finder

## Troubleshooting

### Lỗi 401 Unauthorized
- Kiểm tra API keys đã điền đúng trong `.env`
- CoinMarketCap: Đảm bảo đã activate API key

### Lỗi Rate Limit
- Tăng cache TTL trong `constants.js`
- Giảm số lượng requests

### Lỗi CORS
- Đảm bảo frontend và backend đều chạy
- Kiểm tra CORS config trong `index.js`

## Next Steps

Sau khi test xong 3 API, có thể:
1. Thêm frontend components
2. Implement caching tốt hơn
3. Thêm error handling
4. Deploy lên production
