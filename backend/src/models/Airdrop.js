const mongoose = require('mongoose');

const airdropSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  projectName: {
    type: String,
    required: true,
  },
  chain: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'upcoming', 'ended', 'claimed'],
    default: 'active',
  },
  estimatedValue: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  claimDeadline: {
    type: Date,
  },
  requirements: [{
    type: String,
  }],
  steps: [{
    description: String,
    completed: {
      type: Boolean,
      default: false,
    },
  }],
  contractAddress: {
    type: String,
  },
  website: {
    type: String,
  },
  twitter: {
    type: String,
  },
  discord: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    enum: ['DeFi', 'NFT', 'GameFi', 'Layer2', 'Other'],
    default: 'Other',
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium',
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Indexes
airdropSchema.index({ status: 1 });
airdropSchema.index({ chain: 1 });
airdropSchema.index({ endDate: 1 });
airdropSchema.index({ estimatedValue: -1 });

module.exports = mongoose.model('Airdrop', airdropSchema);
