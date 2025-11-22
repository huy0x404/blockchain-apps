const coinmarketcapAPI = require('./coinmarketcap');
const logger = require('../utils/logger');

/**
 * DefiLlama replacement using CoinMarketCap API
 * Since we don't have DefiLlama API, we'll use CoinMarketCap for market data
 */
class DefiLlamaAPI {
  constructor() {
    this.cmcAPI = coinmarketcapAPI;
  }

  /**
   * Get all protocols (using CMC top coins as protocols)
   */
  async getProtocols() {
    try {
      const data = await this.cmcAPI.getListings(100);
      
      if (data && data.data) {
        // Transform CMC data to look like DefiLlama protocols
        const protocols = data.data.map(coin => ({
          name: coin.name,
          symbol: coin.symbol,
          tvl: coin.quote.USD.market_cap, // Use market cap as TVL
          change_1d: coin.quote.USD.percent_change_24h,
          change_7d: coin.quote.USD.percent_change_7d,
          chains: ['Ethereum'], // Default
          category: 'DeFi',
          logo: `https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`,
        }));
        
        return protocols;
      }
      
      return [];
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
      const data = await this.cmcAPI.getQuotes(protocolName.toUpperCase());
      
      if (data && data.data) {
        const coin = Object.values(data.data)[0];
        
        return {
          name: coin.name,
          symbol: coin.symbol,
          tvl: coin.quote.USD.market_cap,
          price: coin.quote.USD.price,
          volume_24h: coin.quote.USD.volume_24h,
          change_1d: coin.quote.USD.percent_change_24h,
          change_7d: coin.quote.USD.percent_change_7d,
          market_cap: coin.quote.USD.market_cap,
        };
      }
      
      return null;
    } catch (error) {
      logger.error(`DefiLlama getProtocol error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get TVL (using global market cap)
   */
  async getTVL() {
    try {
      const data = await this.cmcAPI.getGlobalMetrics();
      
      if (data && data.data) {
        return data.data.quote.USD.total_market_cap;
      }
      
      return 0;
    } catch (error) {
      logger.error(`DefiLlama getTVL error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get chains (return common chains)
   */
  async getChains() {
    try {
      // Return static list since CMC doesn't have chain data
      return [
        { name: 'Ethereum', tvl: 0 },
        { name: 'BSC', tvl: 0 },
        { name: 'Polygon', tvl: 0 },
        { name: 'Arbitrum', tvl: 0 },
        { name: 'Optimism', tvl: 0 },
      ];
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
      // Extract symbols from coin strings (e.g., "ethereum:0x..." -> "ETH")
      const symbols = coins.map(coin => {
        const parts = coin.split(':');
        return parts[0].toUpperCase();
      });
      
      const data = await this.cmcAPI.getQuotes(symbols);
      
      if (data && data.data) {
        const prices = {};
        Object.values(data.data).forEach(coin => {
          prices[coin.symbol] = {
            price: coin.quote.USD.price,
            symbol: coin.symbol,
          };
        });
        return { coins: prices };
      }
      
      return { coins: {} };
    } catch (error) {
      logger.error(`DefiLlama getPrices error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get pools (not available in CMC, return empty)
   */
  async getPools() {
    try {
      logger.warn('Pools data not available without DefiLlama API');
      return { data: [] };
    } catch (error) {
      logger.error(`DefiLlama getPools error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get stablecoins (filter from CMC listings)
   */
  async getStablecoins() {
    try {
      const data = await this.cmcAPI.getListings(100);
      
      if (data && data.data) {
        const stablecoins = data.data.filter(coin => 
          ['USDT', 'USDC', 'BUSD', 'DAI', 'TUSD', 'USDP'].includes(coin.symbol)
        );
        
        return stablecoins.map(coin => ({
          name: coin.name,
          symbol: coin.symbol,
          circulating: coin.circulating_supply,
          price: coin.quote.USD.price,
        }));
      }
      
      return [];
    } catch (error) {
      logger.error(`DefiLlama getStablecoins error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new DefiLlamaAPI();
