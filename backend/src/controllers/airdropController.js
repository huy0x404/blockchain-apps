const cacheService = require('../services/cacheService');
const logger = require('../utils/logger');
const { CACHE_TTL } = require('../utils/constants');

class AirdropController {
  /**
   * Get all airdrops from cache
   */
  async getAirdrops(req, res) {
    try {
      const { status, chain, limit = 50 } = req.query;

      const cacheKey = 'airdrops:all';
      let airdrops = cacheService.get(cacheKey) || [];

      // Filter airdrops
      if (status) {
        airdrops = airdrops.filter(a => a.status === status);
      }
      if (chain) {
        airdrops = airdrops.filter(a => a.chain === chain);
      }

      res.json({
        success: true,
        count: airdrops.length,
        data: airdrops.slice(0, parseInt(limit)),
      });
    } catch (error) {
      logger.error(`getAirdrops error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get active airdrops
   */
  async getActiveAirdrops(req, res) {
    try {
      const cacheKey = 'airdrops:active';
      const airdrops = cacheService.get(cacheKey) || [];

      res.json({
        success: true,
        count: airdrops.length,
        data: airdrops.slice(0, 50),
      });
    } catch (error) {
      logger.error(`getActiveAirdrops error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get airdrop by ID
   */
  async getAirdropById(req, res) {
    try {
      const { id } = req.params;

      const airdrops = cacheService.get('airdrops:all') || [];
      const airdrop = airdrops.find(a => a.id === id);

      if (!airdrop) {
        return res.status(404).json({
          success: false,
          error: 'Airdrop not found',
        });
      }

      res.json({
        success: true,
        data: airdrop,
      });
    } catch (error) {
      logger.error(`getAirdropById error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get upcoming airdrops
   */
  async getUpcomingAirdrops(req, res) {
    try {
      const cacheKey = 'airdrops:upcoming';
      const airdrops = cacheService.get(cacheKey) || [];

      res.json({
        success: true,
        count: airdrops.length,
        data: airdrops.slice(0, 20),
      });
    } catch (error) {
      logger.error(`getUpcomingAirdrops error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new AirdropController();
