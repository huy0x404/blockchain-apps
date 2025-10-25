const mongoose = require('mongoose');

const priceHistorySchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  price: {
    type: Number,
    required: true,
  },
  volume24h: {
    type: Number,
  },
  marketCap: {
    type: Number,
  },
});

const tokenDataSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  chain: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  symbol: {
    type: String,
    required: true,
  },
  decimals: {
    type: Number,
    default: 18,
  },
  currentPrice: {
    type: Number,
    default: 0,
  },
  marketCap: {
    type: Number,
    default: 0,
  },
  totalSupply: {
    type: Number,
  },
  circulatingSupply: {
    type: Number,
  },
  volume24h: {
    type: Number,
    default: 0,
  },
  priceChange24h: {
    type: Number,
    default: 0,
  },
  liquidity: {
    type: Number,
    default: 0,
  },
  holders: {
    type: Number,
    default: 0,
  },
  priceHistory: [priceHistorySchema],
  topPairs: [{
    dex: String,
    pairAddress: String,
    baseToken: String,
    quoteToken: String,
    liquidity: Number,
  }],
  metadata: {
    website: String,
    twitter: String,
    telegram: String,
    description: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  riskScore: {
    type: Number,
    min: 0,
    max: 100,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Indexes
tokenDataSchema.index({ address: 1, chain: 1 }, { unique: true });
tokenDataSchema.index({ symbol: 1 });
tokenDataSchema.index({ marketCap: -1 });
tokenDataSchema.index({ volume24h: -1 });

module.exports = mongoose.model('TokenData', tokenDataSchema);
