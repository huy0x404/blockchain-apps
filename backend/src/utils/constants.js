module.exports = {
  // Blockchain Networks
  NETWORKS: {
    ETHEREUM: 'ethereum',
    BSC: 'bsc',
    POLYGON: 'polygon',
    ARBITRUM: 'arbitrum',
    OPTIMISM: 'optimism',
    AVALANCHE: 'avalanche',
  },

  // Transaction Types
  TX_TYPES: {
    TRANSFER: 'transfer',
    SWAP: 'swap',
    LIQUIDITY_ADD: 'liquidity_add',
    LIQUIDITY_REMOVE: 'liquidity_remove',
    STAKE: 'stake',
    UNSTAKE: 'unstake',
  },

  // Cache TTL (in seconds)
  CACHE_TTL: {
    SHORT: 60,        // 1 minute
    MEDIUM: 300,      // 5 minutes
    LONG: 3600,       // 1 hour
    VERY_LONG: 86400, // 24 hours
  },

  // API Endpoints
  API_ENDPOINTS: {
    ETHERSCAN: 'https://api.etherscan.io/api',
    BSCSCAN: 'https://api.bscscan.com/api',
    POLYGONSCAN: 'https://api.polygonscan.com/api',
    COINMARKETCAP: 'https://pro-api.coinmarketcap.com/v1',
    COINMARKETCAP_SANDBOX: 'https://sandbox-api.coinmarketcap.com/v1',
  },

  // Alert Thresholds
  ALERTS: {
    WHALE_MIN_VALUE_USD: 100000,
    HIGH_VOLUME_MULTIPLIER: 5,
    PRICE_CHANGE_PERCENT: 10,
  },

  // Airdrop Status
  AIRDROP_STATUS: {
    ACTIVE: 'active',
    UPCOMING: 'upcoming',
    ENDED: 'ended',
    CLAIMED: 'claimed',
  },
};
