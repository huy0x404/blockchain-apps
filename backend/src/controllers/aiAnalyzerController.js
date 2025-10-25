const aiService = require('../services/aiService');
const etherscanAPI = require('../api/etherscan');
const dexScreenerAPI = require('../api/dexScreener');
const Wallet = require('../models/Wallet');
const TokenData = require('../models/TokenData');
const logger = require('../utils/logger');
const { weiToEther } = require('../utils/helpers');

class AIAnalyzerController {
  /**
   * Analyze wallet with AI
   */
  async analyzeWallet(req, res) {
    try {
      const { address } = req.params;

      // Gather wallet data
      const balance = await etherscanAPI.getBalance(address);
      const transactions = await etherscanAPI.getTransactions(address, 0, 99999999, 1, 100);
      const tokenTransfers = await etherscanAPI.getTokenTransfers(address, null, 1, 50);

      // Calculate metrics
      const totalVolume = transactions.reduce((sum, tx) => {
        return sum + weiToEther(tx.value);
      }, 0);

      const uniqueDays = new Set(
        transactions.map(tx => new Date(tx.timeStamp * 1000).toDateString())
      ).size;

      const topTokens = this.getTopTokens(tokenTransfers);

      const walletData = {
        address,
        balance,
        totalTxs: transactions.length,
        totalVolume,
        activeDays: uniqueDays,
        topTokens,
        recentActivity: transactions.slice(0, 10).map(tx => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: weiToEther(tx.value),
          timestamp: new Date(tx.timeStamp * 1000).toISOString(),
        })),
      };

      // Get AI analysis
      const analysis = await aiService.analyzeWalletBehavior(walletData);

      res.json({
        success: true,
        data: {
          walletData,
          aiAnalysis: analysis,
        },
      });
    } catch (error) {
      logger.error(`AI analyzeWallet error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Analyze token with AI
   */
  async analyzeToken(req, res) {
    try {
      const { chain, address } = req.params;

      // Get token data from DexScreener
      const tokenProfile = await dexScreenerAPI.getTokenProfile(chain, address);

      if (!tokenProfile) {
        return res.status(404).json({
          success: false,
          error: 'Token not found',
        });
      }

      // Get pairs for price history
      const pairsData = await dexScreenerAPI.getPairsByToken(chain, address);
      const priceHistory = pairsData.pairs?.slice(0, 5).map(p => ({
        price: p.priceUsd,
        volume: p.volume.h24,
        timestamp: Date.now(),
      })) || [];

      const tokenData = {
        ...tokenProfile,
        holders: 0, // Would need additional API
        priceHistory,
      };

      // Get AI analysis
      const analysis = await aiService.analyzeTokenPotential(tokenData);

      res.json({
        success: true,
        data: {
          tokenData,
          aiAnalysis: analysis,
        },
      });
    } catch (error) {
      logger.error(`AI analyzeToken error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Generate market insights
   */
  async generateMarketInsight(req, res) {
    try {
      const { data } = req.body;

      if (!data) {
        return res.status(400).json({
          success: false,
          error: 'Market data required',
        });
      }

      const insight = await aiService.generateMarketInsight(data);

      res.json({
        success: true,
        data: {
          insight,
          generatedAt: new Date(),
        },
      });
    } catch (error) {
      logger.error(`generateMarketInsight error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Predict wallet behavior
   */
  async predictBehavior(req, res) {
    try {
      const { address } = req.params;

      const wallet = await Wallet.findOne({ address: address.toLowerCase() });
      if (!wallet) {
        return res.status(404).json({
          success: false,
          error: 'Wallet not found in database',
        });
      }

      const transactions = await etherscanAPI.getTransactions(address, 0, 99999999, 1, 100);

      // Prepare data for AI
      const behaviorData = {
        address: wallet.address,
        totalTransactions: transactions.length,
        averageValue: wallet.totalVolume / transactions.length,
        frequency: this.calculateFrequency(transactions),
        patterns: this.detectPatterns(transactions),
      };

      const prediction = await aiService.analyzeWalletBehavior({
        ...behaviorData,
        topTokens: [],
        recentActivity: transactions.slice(0, 5),
        totalVolume: wallet.totalVolume,
        activeDays: 0,
      });

      res.json({
        success: true,
        data: {
          wallet: behaviorData,
          prediction,
        },
      });
    } catch (error) {
      logger.error(`predictBehavior error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Helper: Get top tokens from transfers
   */
  getTopTokens(transfers) {
    const tokenCounts = {};
    
    transfers.forEach(transfer => {
      const symbol = transfer.tokenSymbol;
      tokenCounts[symbol] = (tokenCounts[symbol] || 0) + 1;
    });

    return Object.entries(tokenCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([symbol]) => symbol);
  }

  /**
   * Helper: Calculate transaction frequency
   */
  calculateFrequency(transactions) {
    if (transactions.length < 2) return 0;

    const timestamps = transactions.map(tx => tx.timeStamp * 1000);
    const intervals = [];

    for (let i = 1; i < timestamps.length; i++) {
      intervals.push(timestamps[i - 1] - timestamps[i]);
    }

    const avgInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
    return avgInterval / (1000 * 60 * 60 * 24); // Average days between transactions
  }

  /**
   * Helper: Detect transaction patterns
   */
  detectPatterns(transactions) {
    const hours = transactions.map(tx => new Date(tx.timeStamp * 1000).getHours());
    const days = transactions.map(tx => new Date(tx.timeStamp * 1000).getDay());

    return {
      mostActiveHour: this.getMostFrequent(hours),
      mostActiveDay: this.getMostFrequent(days),
      isRegular: this.checkRegularity(transactions),
    };
  }

  /**
   * Helper: Get most frequent value
   */
  getMostFrequent(arr) {
    const counts = {};
    arr.forEach(val => {
      counts[val] = (counts[val] || 0) + 1;
    });

    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];
  }

  /**
   * Helper: Check if transactions are regular
   */
  checkRegularity(transactions) {
    if (transactions.length < 5) return false;

    const intervals = [];
    for (let i = 1; i < Math.min(transactions.length, 10); i++) {
      intervals.push(transactions[i - 1].timeStamp - transactions[i].timeStamp);
    }

    const avgInterval = intervals.reduce((sum, val) => sum + val, 0) / intervals.length;
    const variance = intervals.reduce((sum, val) => sum + Math.pow(val - avgInterval, 2), 0) / intervals.length;
    
    return variance < avgInterval * 0.5; // Low variance indicates regularity
  }
}

module.exports = new AIAnalyzerController();
