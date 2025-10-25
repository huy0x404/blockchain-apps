const config = require('../config/env');
const fetchService = require('../services/fetchService');
const { API_ENDPOINTS } = require('../utils/constants');
const logger = require('../utils/logger');

class EtherscanAPI {
  constructor() {
    this.baseURL = API_ENDPOINTS.ETHERSCAN;
    this.apiKey = config.ETHERSCAN_API_KEY;
  }

  /**
   * Get account balance
   */
  async getBalance(address) {
    try {
      const data = await fetchService.get(this.baseURL, {
        params: {
          module: 'account',
          action: 'balance',
          address,
          tag: 'latest',
          apikey: this.apiKey,
        },
      });

      if (data.status === '1') {
        return parseInt(data.result) / 1e18; // Convert Wei to ETH
      }
      throw new Error(data.message);
    } catch (error) {
      logger.error(`Etherscan getBalance error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get normal transactions
   */
  async getTransactions(address, startBlock = 0, endBlock = 99999999, page = 1, offset = 100) {
    try {
      const data = await fetchService.get(this.baseURL, {
        params: {
          module: 'account',
          action: 'txlist',
          address,
          startblock: startBlock,
          endblock: endBlock,
          page,
          offset,
          sort: 'desc',
          apikey: this.apiKey,
        },
      });

      if (data.status === '1') {
        return data.result;
      }
      throw new Error(data.message);
    } catch (error) {
      logger.error(`Etherscan getTransactions error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get ERC20 token transfer events
   */
  async getTokenTransfers(address, contractAddress = null, page = 1, offset = 100) {
    try {
      const params = {
        module: 'account',
        action: 'tokentx',
        address,
        page,
        offset,
        sort: 'desc',
        apikey: this.apiKey,
      };

      if (contractAddress) {
        params.contractaddress = contractAddress;
      }

      const data = await fetchService.get(this.baseURL, { params });

      if (data.status === '1') {
        return data.result;
      }
      throw new Error(data.message);
    } catch (error) {
      logger.error(`Etherscan getTokenTransfers error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get contract ABI
   */
  async getContractABI(address) {
    try {
      const data = await fetchService.get(this.baseURL, {
        params: {
          module: 'contract',
          action: 'getabi',
          address,
          apikey: this.apiKey,
        },
      });

      if (data.status === '1') {
        return JSON.parse(data.result);
      }
      throw new Error(data.message);
    } catch (error) {
      logger.error(`Etherscan getContractABI error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get gas price
   */
  async getGasPrice() {
    try {
      const data = await fetchService.get(this.baseURL, {
        params: {
          module: 'gastracker',
          action: 'gasoracle',
          apikey: this.apiKey,
        },
      });

      if (data.status === '1') {
        return data.result;
      }
      throw new Error(data.message);
    } catch (error) {
      logger.error(`Etherscan getGasPrice error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new EtherscanAPI();
