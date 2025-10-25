const fetchService = require('../services/fetchService');
const { API_ENDPOINTS } = require('../utils/constants');
const logger = require('../utils/logger');

class DexScreenerAPI {
  constructor() {
    this.baseURL = API_ENDPOINTS.DEXSCREENER;
  }

  /**
   * Search pairs
   */
  async searchPairs(query) {
    try {
      return await fetchService.get(`${this.baseURL}/dex/search`, {
        params: { q: query },
      });
    } catch (error) {
      logger.error(`DexScreener searchPairs error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get pairs by token address
   */
  async getPairsByToken(chainId, tokenAddress) {
    try {
      return await fetchService.get(
        `${this.baseURL}/dex/tokens/${chainId}/${tokenAddress}`
      );
    } catch (error) {
      logger.error(`DexScreener getPairsByToken error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get specific pair
   */
  async getPair(chainId, pairAddress) {
    try {
      return await fetchService.get(
        `${this.baseURL}/dex/pairs/${chainId}/${pairAddress}`
      );
    } catch (error) {
      logger.error(`DexScreener getPair error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get token profile
   */
  async getTokenProfile(chainId, tokenAddress) {
    try {
      const data = await this.getPairsByToken(chainId, tokenAddress);
      
      if (data.pairs && data.pairs.length > 0) {
        const pair = data.pairs[0];
        return {
          address: tokenAddress,
          name: pair.baseToken.name,
          symbol: pair.baseToken.symbol,
          price: parseFloat(pair.priceUsd),
          priceChange24h: parseFloat(pair.priceChange.h24),
          volume24h: parseFloat(pair.volume.h24),
          liquidity: parseFloat(pair.liquidity.usd),
          fdv: parseFloat(pair.fdv),
        };
      }
      
      return null;
    } catch (error) {
      logger.error(`DexScreener getTokenProfile error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new DexScreenerAPI();
