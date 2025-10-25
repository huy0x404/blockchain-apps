const axios = require('axios');
const logger = require('../utils/logger');
const { retry } = require('../utils/helpers');

class FetchService {
  /**
   * Generic GET request with error handling and retry
   */
  async get(url, config = {}) {
    try {
      return await retry(async () => {
        const response = await axios.get(url, {
          timeout: 10000,
          ...config,
        });
        return response.data;
      });
    } catch (error) {
      logger.error(`Fetch error [GET ${url}]: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generic POST request
   */
  async post(url, data, config = {}) {
    try {
      const response = await axios.post(url, data, {
        timeout: 10000,
        ...config,
      });
      return response.data;
    } catch (error) {
      logger.error(`Fetch error [POST ${url}]: ${error.message}`);
      throw error;
    }
  }

  /**
   * Batch requests with rate limiting
   */
  async batchGet(urls, delayMs = 200) {
    const results = [];
    
    for (const url of urls) {
      try {
        const data = await this.get(url);
        results.push({ success: true, data });
      } catch (error) {
        results.push({ success: false, error: error.message });
      }
      
      // Delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
    
    return results;
  }
}

module.exports = new FetchService();
