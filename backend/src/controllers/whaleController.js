const etherscanAPI = require('../api/etherscan');
const dexScreenerAPI = require('../api/dexScreener');
const cacheService = require('../services/cacheService');
const logger = require('../utils/logger');
const { formatAddress, weiToEther } = require('../utils/helpers');
const { CACHE_TTL } = require('../utils/constants');

class WhaleController {
  /**
   * Get whale wallets from cache
   */
  async getWhaleWallets(req, res) {
    try {
      const { limit = 50 } = req.query;

      const cacheKey = 'whales:list';
      const whales = cacheService.get(cacheKey) || [];

      res.json({
        success: true,
        count: whales.length,
        data: whales.slice(0, parseInt(limit)),
      });
    } catch (error) {
      logger.error(`getWhaleWallets error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Track wallet
   */
  async trackWallet(req, res) {
    try {
      const { address } = req.params;

      // Check cache first
      const cacheKey = `wallet:${address}`;
      const cached = cacheService.get(cacheKey);
      if (cached) {
        return res.json({
          success: true,
          data: cached,
          cached: true,
        });
      }

      // Fetch from blockchain
      const balance = await etherscanAPI.getBalance(address);
      const transactions = await etherscanAPI.getTransactions(address, 0, 99999999, 1, 10);
      const tokenTransfers = await etherscanAPI.getTokenTransfers(address, null, 1, 10);

      // Calculate metrics
      const totalVolume = transactions.reduce((sum, tx) => {
        return sum + parseFloat(weiToEther(tx.value));
      }, 0);

      const isWhale = balance >= 100 || totalVolume >= 1000;

      const wallet = {
        address: address.toLowerCase(),
        balance,
        totalTransactions: transactions.length,
        totalVolume,
        isWhale,
        lastActive: new Date(),
      };

      const result = {
        wallet,
        recentTransactions: transactions.slice(0, 10),
        recentTokenTransfers: tokenTransfers.slice(0, 10),
      };

      // Cache result
      cacheService.set(cacheKey, result, CACHE_TTL.MEDIUM);

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      logger.error(`trackWallet error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get recent whale transactions
   */
  async getRecentWhaleTransactions(req, res) {
    try {
      const { limit = 20 } = req.query;

      const cacheKey = 'whales:transactions';
      const transactions = cacheService.get(cacheKey) || [];

      res.json({
        success: true,
        count: transactions.length,
        data: transactions.slice(0, parseInt(limit)),
      });
    } catch (error) {
      logger.error(`getRecentWhaleTransactions error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Analyze whale wallet
   */
  async analyzeWallet(req, res) {
    try {
      const { address } = req.params;

      const balance = await etherscanAPI.getBalance(address);
      const transactions = await etherscanAPI.getTransactions(address, 0, 99999999, 1, 100);
      const totalVolume = transactions.reduce((sum, tx) => {
        return sum + parseFloat(weiToEther(tx.value));
      }, 0);

      const wallet = {
        address: address.toLowerCase(),
        balance,
        totalTransactions: transactions.length,
        totalVolume,
        isWhale: balance >= 100 || totalVolume >= 1000,
      };

      // Analyze patterns
      const analysis = {
        address: formatAddress(address),
        balance: wallet.balance,
        totalTransactions: transactions.length,
        totalVolume: wallet.totalVolume,
        isWhale: wallet.isWhale,
        averageTransactionValue: wallet.totalVolume / transactions.length,
        mostActiveHour: this.getMostActiveHour(transactions),
        topInteractions: this.getTopInteractions(transactions),
        activityTrend: this.getActivityTrend(transactions),
      };

      res.json({
        success: true,
        data: analysis,
      });
    } catch (error) {
      logger.error(`analyzeWallet error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Helper: Get most active hour
   */
  getMostActiveHour(transactions) {
    const hours = transactions.map(tx => new Date(tx.timeStamp * 1000).getHours());
    const hourCounts = hours.reduce((acc, hour) => {
      acc[hour] = (acc[hour] || 0) + 1;
      return acc;
    }, {});

    const mostActive = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];
    return mostActive ? parseInt(mostActive[0]) : null;
  }

  /**
   * Helper: Get top interactions
   */
  getTopInteractions(transactions) {
    const addresses = {};
    
    transactions.forEach(tx => {
      const address = tx.from === tx.to ? tx.to : (tx.from || tx.to);
      addresses[address] = (addresses[address] || 0) + 1;
    });

    return Object.entries(addresses)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([address, count]) => ({
        address: formatAddress(address),
        interactions: count,
      }));
  }

  /**
   * Helper: Get activity trend
   */
  getActivityTrend(transactions) {
    const last7Days = transactions.filter(tx => {
      const txDate = new Date(tx.timeStamp * 1000);
      const daysDiff = (Date.now() - txDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 7;
    });

    const last30Days = transactions.filter(tx => {
      const txDate = new Date(tx.timeStamp * 1000);
      const daysDiff = (Date.now() - txDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff <= 30;
    });

    return {
      last7Days: last7Days.length,
      last30Days: last30Days.length,
      trend: last7Days.length > last30Days.length / 4 ? 'increasing' : 'decreasing',
    };
  }
}

module.exports = new WhaleController();
