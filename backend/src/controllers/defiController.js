const defiLlamaAPI = require('../api/defiLlama');
const dexScreenerAPI = require('../api/dexScreener');
const cacheService = require('../services/cacheService');
const logger = require('../utils/logger');
const { CACHE_TTL } = require('../utils/constants');

class DefiController {
  /**
   * Get all DeFi protocols
   */
  async getProtocols(req, res) {
    try {
      const { limit = 100 } = req.query;

      const cacheKey = 'defi:protocols';
      const protocols = await cacheService.getOrSet(
        cacheKey,
        () => defiLlamaAPI.getProtocols(),
        CACHE_TTL.LONG
      );

      const sorted = protocols.sort((a, b) => b.tvl - a.tvl);

      res.json({
        success: true,
        count: sorted.length,
        data: sorted.slice(0, parseInt(limit)),
      });
    } catch (error) {
      logger.error(`getProtocols error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get protocol details
   */
  async getProtocolDetails(req, res) {
    try {
      const { name } = req.params;

      const cacheKey = `defi:protocol:${name}`;
      const protocol = await cacheService.getOrSet(
        cacheKey,
        () => defiLlamaAPI.getProtocol(name),
        CACHE_TTL.MEDIUM
      );

      res.json({
        success: true,
        data: protocol,
      });
    } catch (error) {
      logger.error(`getProtocolDetails error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get total TVL across all chains
   */
  async getTotalTVL(req, res) {
    try {
      const cacheKey = 'defi:tvl:total';
      const tvl = await cacheService.getOrSet(
        cacheKey,
        () => defiLlamaAPI.getTVL(),
        CACHE_TTL.MEDIUM
      );

      res.json({
        success: true,
        data: { totalTVL: tvl },
      });
    } catch (error) {
      logger.error(`getTotalTVL error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get chains data
   */
  async getChains(req, res) {
    try {
      const cacheKey = 'defi:chains';
      const chains = await cacheService.getOrSet(
        cacheKey,
        () => defiLlamaAPI.getChains(),
        CACHE_TTL.LONG
      );

      res.json({
        success: true,
        count: chains.length,
        data: chains,
      });
    } catch (error) {
      logger.error(`getChains error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get yields/pools
   */
  async getYieldPools(req, res) {
    try {
      const { chain, project, minTvl = 0 } = req.query;

      const cacheKey = `defi:pools:${chain || 'all'}:${project || 'all'}`;
      let pools = await cacheService.getOrSet(
        cacheKey,
        () => defiLlamaAPI.getPools(),
        CACHE_TTL.MEDIUM
      );

      // Filter pools
      if (pools && pools.data) {
        let filtered = pools.data;

        if (chain) {
          filtered = filtered.filter(p => p.chain.toLowerCase() === chain.toLowerCase());
        }

        if (project) {
          filtered = filtered.filter(p => p.project.toLowerCase() === project.toLowerCase());
        }

        filtered = filtered.filter(p => p.tvlUsd >= parseFloat(minTvl));

        // Sort by APY
        filtered.sort((a, b) => b.apy - a.apy);

        res.json({
          success: true,
          count: filtered.length,
          data: filtered.slice(0, 100),
        });
      } else {
        res.json({
          success: true,
          count: 0,
          data: [],
        });
      }
    } catch (error) {
      logger.error(`getYieldPools error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get token price
   */
  async getTokenPrice(req, res) {
    try {
      const { coins } = req.query; // Format: "ethereum:0x..."

      if (!coins) {
        return res.status(400).json({
          success: false,
          error: 'Coins parameter required',
        });
      }

      const coinsList = coins.split(',');
      const prices = await defiLlamaAPI.getPrices(coinsList);

      res.json({
        success: true,
        data: prices,
      });
    } catch (error) {
      logger.error(`getTokenPrice error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Search token on DEX
   */
  async searchToken(req, res) {
    try {
      const { query } = req.query;

      if (!query) {
        return res.status(400).json({
          success: false,
          error: 'Search query required',
        });
      }

      const results = await dexScreenerAPI.searchPairs(query);

      res.json({
        success: true,
        data: results,
      });
    } catch (error) {
      logger.error(`searchToken error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get token pairs
   */
  async getTokenPairs(req, res) {
    try {
      const { chain, address } = req.params;

      const cacheKey = `dex:pairs:${chain}:${address}`;
      const pairs = await cacheService.getOrSet(
        cacheKey,
        () => dexScreenerAPI.getPairsByToken(chain, address),
        CACHE_TTL.SHORT
      );

      res.json({
        success: true,
        data: pairs,
      });
    } catch (error) {
      logger.error(`getTokenPairs error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }

  /**
   * Get top DeFi protocols by TVL
   */
  async getTopProtocols(req, res) {
    try {
      const { limit = 10 } = req.query;

      const protocols = await defiLlamaAPI.getProtocols();
      const top = protocols
        .sort((a, b) => b.tvl - a.tvl)
        .slice(0, parseInt(limit))
        .map(p => ({
          name: p.name,
          symbol: p.symbol,
          tvl: p.tvl,
          change_1d: p.change_1d,
          change_7d: p.change_7d,
          chains: p.chains,
          category: p.category,
        }));

      res.json({
        success: true,
        count: top.length,
        data: top,
      });
    } catch (error) {
      logger.error(`getTopProtocols error: ${error.message}`);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

module.exports = new DefiController();
