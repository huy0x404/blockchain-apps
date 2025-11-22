require('dotenv').config();

module.exports = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Blockchain APIs
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  
  // ZAN Web3 provider
  ZAN_API_KEY: process.env.ZAN_API_KEY,
  ZAN_API_URL: process.env.ZAN_API_URL || 'https://api.zan.top/node/v1/eth/mainnet',
  
  // Market Data
  COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,

  // App Settings
  WHALE_THRESHOLD_ETH: parseFloat(process.env.WHALE_THRESHOLD_ETH) || 100,
  WHALE_THRESHOLD_USD: parseFloat(process.env.WHALE_THRESHOLD_USD) || 100000,
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
};
