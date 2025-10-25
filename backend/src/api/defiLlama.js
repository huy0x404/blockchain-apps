const fetchService = require('../services/fetchService');
const { API_ENDPOINTS } = require('../utils/constants');
const logger = require('../utils/logger');

class DefiLlamaAPI {
  constructor() {
    this.baseURL = API_ENDPOINTS.DEFILLAMA;
  }

  /**
   * Get all protocols
   */
  async getProtocols() {
    try {
      return await fetchService.get(`${this.baseURL}/protocols`);
    } catch (error) {
      logger.error(`DefiLlama getProtocols error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get protocol details
   */
  async getProtocol(protocolName) {
    try {
      return await fetchService.get(`${this.baseURL}/protocol/${protocolName}`);
    } catch (error) {
      logger.error(`DefiLlama getProtocol error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get TVL (Total Value Locked)
   */
  async getTVL() {
    try {
      return await fetchService.get(`${this.baseURL}/tvl`);
    } catch (error) {
      logger.error(`DefiLlama getTVL error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get chains
   */
  async getChains() {
    try {
      return await fetchService.get(`${this.baseURL}/chains`);
    } catch (error) {
      logger.error(`DefiLlama getChains error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get current prices
   */
  async getPrices(coins) {
    try {
      const coinsParam = coins.join(',');
      return await fetchService.get(`${this.baseURL}/prices/current/${coinsParam}`);
    } catch (error) {
      logger.error(`DefiLlama getPrices error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get pools (yields)
   */
  async getPools() {
    try {
      return await fetchService.get('https://yields.llama.fi/pools');
    } catch (error) {
      logger.error(`DefiLlama getPools error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get stablecoins
   */
  async getStablecoins() {
    try {
      return await fetchService.get('https://stablecoins.llama.fi/stablecoins');
    } catch (error) {
      logger.error(`DefiLlama getStablecoins error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new DefiLlamaAPI();
