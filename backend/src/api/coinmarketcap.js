const config = require('../config/env');
const fetchService = require('../services/fetchService');
const { API_ENDPOINTS } = require('../utils/constants');
const logger = require('../utils/logger');

class CoinMarketCapAPI {
  constructor() {
    this.baseURL = API_ENDPOINTS.COINMARKETCAP;
    this.apiKey = config.COINMARKETCAP_API_KEY;
  }

  /**
   * Get cryptocurrency listings (top coins by market cap)
   */
  async getListings(limit = 100) {
    try {
      return await fetchService.get(`${this.baseURL}/cryptocurrency/listings/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
        },
        params: {
          limit,
          convert: 'USD',
        },
      });
    } catch (error) {
      logger.error(`CoinMarketCap getListings error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get cryptocurrency quotes (prices)
   */
  async getQuotes(symbols) {
    try {
      const symbolsList = Array.isArray(symbols) ? symbols.join(',') : symbols;
      return await fetchService.get(`${this.baseURL}/cryptocurrency/quotes/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
        },
        params: {
          symbol: symbolsList,
          convert: 'USD',
        },
      });
    } catch (error) {
      logger.error(`CoinMarketCap getQuotes error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get cryptocurrency info/metadata
   */
  async getCryptoInfo(symbols) {
    try {
      const symbolsList = Array.isArray(symbols) ? symbols.join(',') : symbols;
      return await fetchService.get(`${this.baseURL}/cryptocurrency/info`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
        },
        params: {
          symbol: symbolsList,
        },
      });
    } catch (error) {
      logger.error(`CoinMarketCap getCryptoInfo error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get global crypto market metrics
   */
  async getGlobalMetrics() {
    try {
      return await fetchService.get(`${this.baseURL}/global-metrics/quotes/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
        },
      });
    } catch (error) {
      logger.error(`CoinMarketCap getGlobalMetrics error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get trending cryptocurrencies
   */
  async getTrending(limit = 10) {
    try {
      return await fetchService.get(`${this.baseURL}/cryptocurrency/trending/latest`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
        },
        params: {
          limit,
        },
      });
    } catch (error) {
      logger.error(`CoinMarketCap getTrending error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get cryptocurrency categories
   */
  async getCategories() {
    try {
      return await fetchService.get(`${this.baseURL}/cryptocurrency/categories`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
        },
      });
    } catch (error) {
      logger.error(`CoinMarketCap getCategories error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Search for cryptocurrencies
   */
  async search(query) {
    try {
      // CMC doesn't have direct search, so we get listings and filter
      const data = await this.getListings(1000);
      
      if (data && data.data) {
        const results = data.data.filter(coin => 
          coin.name.toLowerCase().includes(query.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(query.toLowerCase())
        );
        
        return {
          status: data.status,
          data: results,
        };
      }
      
      return { status: { error_code: 0 }, data: [] };
    } catch (error) {
      logger.error(`CoinMarketCap search error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get price history (OHLCV)
   */
  async getPriceHistory(symbol, timeStart, timeEnd) {
    try {
      return await fetchService.get(`${this.baseURL}/cryptocurrency/ohlcv/historical`, {
        headers: {
          'X-CMC_PRO_API_KEY': this.apiKey,
        },
        params: {
          symbol,
          time_start: timeStart,
          time_end: timeEnd,
          convert: 'USD',
        },
      });
    } catch (error) {
      logger.error(`CoinMarketCap getPriceHistory error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new CoinMarketCapAPI();
