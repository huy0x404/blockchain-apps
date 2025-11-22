const config = require('../config/env');
const fetchService = require('../services/fetchService');
const logger = require('../utils/logger');

class ZanAPI {
  constructor() {
    this.apiKey = config.ZAN_API_KEY;
    this.apiUrl = config.ZAN_API_URL;
  }

  /**
   * Make JSON-RPC call to ZAN
   */
  async rpcCall(method, params = []) {
    try {
      const response = await fetchService.post(this.apiUrl, {
        jsonrpc: '2.0',
        id: 1,
        method,
        params,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return response.result;
    } catch (error) {
      logger.error(`ZAN RPC call error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get ETH balance
   */
  async getBalance(address) {
    try {
      const balance = await this.rpcCall('eth_getBalance', [address, 'latest']);
      return parseInt(balance, 16) / 1e18; // Convert Wei to ETH
    } catch (error) {
      logger.error(`ZAN getBalance error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get transaction count (nonce)
   */
  async getTransactionCount(address) {
    try {
      const count = await this.rpcCall('eth_getTransactionCount', [address, 'latest']);
      return parseInt(count, 16);
    } catch (error) {
      logger.error(`ZAN getTransactionCount error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get block number
   */
  async getBlockNumber() {
    try {
      const blockNumber = await this.rpcCall('eth_blockNumber', []);
      return parseInt(blockNumber, 16);
    } catch (error) {
      logger.error(`ZAN getBlockNumber error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get block by number
   */
  async getBlock(blockNumber, fullTransactions = false) {
    try {
      const blockHex = '0x' + blockNumber.toString(16);
      return await this.rpcCall('eth_getBlockByNumber', [blockHex, fullTransactions]);
    } catch (error) {
      logger.error(`ZAN getBlock error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get transaction by hash
   */
  async getTransaction(txHash) {
    try {
      return await this.rpcCall('eth_getTransactionByHash', [txHash]);
    } catch (error) {
      logger.error(`ZAN getTransaction error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get transaction receipt
   */
  async getTransactionReceipt(txHash) {
    try {
      return await this.rpcCall('eth_getTransactionReceipt', [txHash]);
    } catch (error) {
      logger.error(`ZAN getTransactionReceipt error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get gas price
   */
  async getGasPrice() {
    try {
      const gasPrice = await this.rpcCall('eth_gasPrice', []);
      return parseInt(gasPrice, 16) / 1e9; // Convert to Gwei
    } catch (error) {
      logger.error(`ZAN getGasPrice error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Call contract method (read-only)
   */
  async call(transaction) {
    try {
      return await this.rpcCall('eth_call', [transaction, 'latest']);
    } catch (error) {
      logger.error(`ZAN call error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get ERC20 token balance
   */
  async getTokenBalance(tokenAddress, walletAddress) {
    try {
      // ERC20 balanceOf function signature
      const data = '0x70a08231000000000000000000000000' + walletAddress.substring(2);
      
      const balance = await this.call({
        to: tokenAddress,
        data: data,
      });
      
      return parseInt(balance, 16);
    } catch (error) {
      logger.error(`ZAN getTokenBalance error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get logs (events)
   */
  async getLogs(fromBlock, toBlock, address, topics) {
    try {
      const params = {
        fromBlock: '0x' + fromBlock.toString(16),
        toBlock: '0x' + toBlock.toString(16),
      };

      if (address) params.address = address;
      if (topics) params.topics = topics;

      return await this.rpcCall('eth_getLogs', [params]);
    } catch (error) {
      logger.error(`ZAN getLogs error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new ZanAPI();
