require('dotenv').config();

module.exports = {
  // Server
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',

  // Database
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/blockchain-apps',
  REDIS_URL: process.env.REDIS_URL,

  // Blockchain APIs
  ETHERSCAN_API_KEY: process.env.ETHERSCAN_API_KEY,
  ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY,
  INFURA_API_KEY: process.env.INFURA_API_KEY,

  // DeFi & Market Data APIs
  COINGECKO_API_KEY: process.env.COINGECKO_API_KEY,
  COINMARKETCAP_API_KEY: process.env.COINMARKETCAP_API_KEY,
  DEFILLAMA_API_KEY: process.env.DEFILLAMA_API_KEY,
  DEXSCREENER_API_KEY: process.env.DEXSCREENER_API_KEY,

  // Social & Alerts
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID,
  TWITTER_API_KEY: process.env.TWITTER_API_KEY,
  TWITTER_API_SECRET: process.env.TWITTER_API_SECRET,
  TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN,

  // AI & Analytics
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  DUNE_API_KEY: process.env.DUNE_API_KEY,

  // App Settings
  WHALE_THRESHOLD_ETH: parseFloat(process.env.WHALE_THRESHOLD_ETH) || 100,
  WHALE_THRESHOLD_USD: parseFloat(process.env.WHALE_THRESHOLD_USD) || 100000,
  
  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  RATE_LIMIT_MAX_REQUESTS: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
};
