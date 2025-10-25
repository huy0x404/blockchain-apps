const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  totalTransactions: {
    type: Number,
    default: 0,
  },
  totalVolume: {
    type: Number,
    default: 0,
  },
  firstSeen: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  },
  tags: [{
    type: String,
  }],
  isWhale: {
    type: Boolean,
    default: false,
  },
  riskScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  metadata: {
    type: Map,
    of: mongoose.Schema.Types.Mixed,
  },
}, {
  timestamps: true,
});

// Indexes
walletSchema.index({ address: 1 });
walletSchema.index({ isWhale: 1 });
walletSchema.index({ lastActive: -1 });
walletSchema.index({ totalVolume: -1 });

module.exports = mongoose.model('Wallet', walletSchema);
