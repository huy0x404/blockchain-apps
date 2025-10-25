const Airdrop = require('../models/Airdrop');
const twitterAPI = require('../api/twitter');
const cacheService = require('../services/cacheService');
const logger = require('../utils/logger');
const { CACHE_TTL, AIRDROP_STATUS } = require('../utils/constants');

class AirdropController {
  /**
   * Get all airdrops
   */
  async getAirdrops(req, res) {
    try {
      const { status, chain, limit = 50, sortBy = 'estimatedValue' } = req.query;

      const query = {};
      if (status) query.status = status;
      if (chain) query.chain = chain;

      const airdrops = await Airdrop.find(query)
        .sort({ [sortBy]: -1 })
        .limit(parseInt(limit));

      res.json({
        success: true,
        count: airdrops.length,
        data: airdrops,
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
      const airdrops = await Airdrop.find({
        status: AIRDROP_STATUS.ACTIVE,
        endDate: { $gte: new Date() },
      })
        .sort({ estimatedValue: -1 })
        .limit(50);

      res.json({
        success: true,
        count: airdrops.length,
        data: airdrops,
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

      const airdrop = await Airdrop.findById(id);
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
   * Create new airdrop
   */
  async createAirdrop(req, res) {
    try {
      const airdropData = req.body;

      const airdrop = new Airdrop(airdropData);
      await airdrop.save();

      res.status(201).json({
        success: true,
        data: airdrop,
      });
    } catch (error) {
      logger.error(`createAirdrop error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Update airdrop
   */
  async updateAirdrop(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const airdrop = await Airdrop.findByIdAndUpdate(id, updates, {
        new: true,
        runValidators: true,
      });

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
      logger.error(`updateAirdrop error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Delete airdrop
   */
  async deleteAirdrop(req, res) {
    try {
      const { id } = req.params;

      const airdrop = await Airdrop.findByIdAndDelete(id);
      if (!airdrop) {
        return res.status(404).json({
          success: false,
          error: 'Airdrop not found',
        });
      }

      res.json({
        success: true,
        message: 'Airdrop deleted successfully',
      });
    } catch (error) {
      logger.error(`deleteAirdrop error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Search airdrops from Twitter
   */
  async searchFromTwitter(req, res) {
    try {
      const { project } = req.query;

      const cacheKey = `twitter:airdrops:${project || 'all'}`;
      const cached = cacheService.get(cacheKey);
      if (cached) {
        return res.json({
          success: true,
          data: cached,
          cached: true,
        });
      }

      const tweets = await twitterAPI.searchAirdropTweets(project);
      
      // Process tweets to extract airdrop info
      const airdrops = this.extractAirdropsFromTweets(tweets);

      cacheService.set(cacheKey, airdrops, CACHE_TTL.LONG);

      res.json({
        success: true,
        count: airdrops.length,
        data: airdrops,
      });
    } catch (error) {
      logger.error(`searchFromTwitter error: ${error.message}`);
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
      const airdrops = await Airdrop.find({
        status: AIRDROP_STATUS.UPCOMING,
        startDate: { $gte: new Date() },
      })
        .sort({ startDate: 1 })
        .limit(20);

      res.json({
        success: true,
        count: airdrops.length,
        data: airdrops,
      });
    } catch (error) {
      logger.error(`getUpcomingAirdrops error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Helper: Extract airdrops from tweets
   */
  extractAirdropsFromTweets(tweetsData) {
    if (!tweetsData || !tweetsData.data) return [];

    return tweetsData.data.map(tweet => {
      // Basic extraction - can be enhanced with NLP
      return {
        source: 'twitter',
        text: tweet.text,
        url: `https://twitter.com/user/status/${tweet.id}`,
        createdAt: tweet.created_at,
        metrics: tweet.public_metrics,
      };
    });
  }
}

module.exports = new AirdropController();
