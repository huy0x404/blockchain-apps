const ENDPOINTS = {
  // Whale Tracker
  whale: {
    getWhales: '/whale/whales',
    trackWallet: (address) => `/whale/track/${address}`,
    getRecentTransactions: '/whale/transactions/recent',
    analyzeWallet: (address) => `/whale/analyze/${address}`,
  },

  // Airdrop Finder
  airdrop: {
    getAll: '/airdrop',
    getActive: '/airdrop/active',
    getUpcoming: '/airdrop/upcoming',
    searchTwitter: '/airdrop/search/twitter',
    getById: (id) => `/airdrop/${id}`,
    create: '/airdrop',
    update: (id) => `/airdrop/${id}`,
    delete: (id) => `/airdrop/${id}`,
  },

  // DeFi Analytics
  defi: {
    getProtocols: '/defi/protocols',
    getTopProtocols: '/defi/protocols/top',
    getProtocolDetails: (name) => `/defi/protocols/${name}`,
    getTVL: '/defi/tvl',
    getChains: '/defi/chains',
    getPools: '/defi/pools',
    getPrices: '/defi/prices',
    searchToken: '/defi/search',
    getTokenPairs: (chain, address) => `/defi/pairs/${chain}/${address}`,
  },

  // AI Analyzer
  ai: {
    analyzeWallet: (address) => `/ai/wallet/${address}`,
    analyzeToken: (chain, address) => `/ai/token/${chain}/${address}`,
    generateInsights: '/ai/insights',
    predictBehavior: (address) => `/ai/predict/${address}`,
  },
};

export default ENDPOINTS;
