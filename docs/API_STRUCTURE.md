# API Structure

## Base URL
```
http://localhost:5000/api
```

## Endpoints

### Whale Tracker

#### Get Whale Wallets
```http
GET /whale/whales?limit=50&sortBy=totalVolume
```

Response:
```json
{
  "success": true,
  "count": 50,
  "data": [
    {
      "address": "0x...",
      "balance": 1234.56,
      "totalTransactions": 500,
      "totalVolume": 10000,
      "isWhale": true,
      "lastActive": "2025-10-26T..."
    }
  ]
}
```

#### Track Wallet
```http
GET /whale/track/:address
```

#### Recent Whale Transactions
```http
GET /whale/transactions/recent?limit=20
```

#### Analyze Wallet
```http
GET /whale/analyze/:address
```

---

### Airdrop Finder

#### Get All Airdrops
```http
GET /airdrop?status=active&chain=ethereum&limit=50
```

#### Get Active Airdrops
```http
GET /airdrop/active
```

#### Get Upcoming Airdrops
```http
GET /airdrop/upcoming
```

#### Search from Twitter
```http
GET /airdrop/search/twitter?project=projectName
```

#### Create Airdrop
```http
POST /airdrop
Content-Type: application/json

{
  "name": "Airdrop Name",
  "projectName": "Project",
  "chain": "ethereum",
  "estimatedValue": 1000,
  "requirements": ["Requirement 1", "Requirement 2"]
}
```

---

### DeFi Analytics

#### Get Protocols
```http
GET /defi/protocols?limit=100
```

#### Get Top Protocols
```http
GET /defi/protocols/top?limit=10
```

#### Get Protocol Details
```http
GET /defi/protocols/:name
```

#### Get Total TVL
```http
GET /defi/tvl
```

#### Get Chains
```http
GET /defi/chains
```

#### Get Yield Pools
```http
GET /defi/pools?chain=ethereum&minTvl=1000000
```

#### Get Token Pairs
```http
GET /defi/pairs/:chain/:address
```

---

### AI Analyzer

#### Analyze Wallet
```http
GET /ai/wallet/:address
```

Response:
```json
{
  "success": true,
  "data": {
    "walletData": { ... },
    "aiAnalysis": "AI analysis text..."
  }
}
```

#### Analyze Token
```http
GET /ai/token/:chain/:address
```

#### Generate Insights
```http
POST /ai/insights
Content-Type: application/json

{
  "data": {
    "marketData": { ... }
  }
}
```

#### Predict Behavior
```http
GET /ai/predict/:address
```

---

## Error Responses

```json
{
  "success": false,
  "error": "Error message"
}
```

## Rate Limiting

- 100 requests per 15 minutes per IP
- Returns 429 status code when limit exceeded
