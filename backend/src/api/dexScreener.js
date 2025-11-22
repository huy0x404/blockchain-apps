const coinmarketcapAPI = require('./coinmarketcap');
const logger = require('../utils/logger');

/**
 * DexScreener replacement using CoinMarketCap API
 * Since we don't have DexScreener API, we'll use CoinMarketCap for token data
 */
class DexScreenerAPI {
  constructor() {
    this.cmcAPI = coinmarketcapAPI;
  }

  /**
   * Search pairs (using CMC search)
   */
  async searchPairs(query) {
    try {
      const data = await this.cmcAPI.search(query);
      
      if (data && data.data) {
        const pairs = data.data.map(coin => ({
          chainId: 'ethereum',
          pairAddress: '0x0000000000000000000000000000000000000000',
          baseToken: {
            name: coin.name,
            symbol: coin.symbol,
            address: '0x0000000000000000000000000000000000000000',
          },
          priceUsd: coin.quote.USD.price.toString(),
          priceChange: {
            h24: coin.quote.USD.percent_change_24h,
          },
          volume: {
            h24: coin.quote.USD.volume_24h,
          },
          liquidity: {
            usd: coin.quote.USD.market_cap,
          },
        }));
        
        return { pairs };
      }
      
      return { pairs: [] };
    } catch (error) {
      logger.error(`DexScreener searchPairs error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get pairs by token address (using CMC quotes)
   */
  async getPairsByToken(chainId, tokenSymbol) {
    try {
      const data = await this.cmcAPI.getQuotes(tokenSymbol.toUpperCase());
      
      if (data && data.data) {
        const coin = Object.values(data.data)[0];
        
        return {
          pairs: [{
            chainId,
            baseToken: {
              name: coin.name,
              symbol: coin.symbol,
              address: tokenSymbol,
            },
            priceUsd: coin.quote.USD.price.toString(),
            priceChange: {
              h24: coin.quote.USD.percent_change_24h,
            },
            volume: {
              h24: coin.quote.USD.volume_24h,
            },
            liquidity: {
              usd: coin.quote.USD.market_cap,
            },
            fdv: coin.quote.USD.fully_diluted_market_cap,
          }],
        };
      }
      
      return { pairs: [] };
    } catch (error) {
      logger.error(`DexScreener getPairsByToken error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get specific pair (using CMC quotes)
   */
  async getPair(chainId, pairAddress) {
    try {
      logger.warn('Pair data limited without DexScreener API');
      return { pair: null };
    } catch (error) {
      logger.error(`DexScreener getPair error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Get token profile (using CMC info)
   */
  async getTokenProfile(chainId, tokenSymbol) {
    try {
      const data = await this.cmcAPI.getQuotes(tokenSymbol.toUpperCase());
      
      if (data && data.data) {
        const coin = Object.values(data.data)[0];
        
        return {
          address: tokenSymbol,
          name: coin.name,
          symbol: coin.symbol,
          price: parseFloat(coin.quote.USD.price),
          priceChange24h: parseFloat(coin.quote.USD.percent_change_24h),
          volume24h: parseFloat(coin.quote.USD.volume_24h),
          liquidity: parseFloat(coin.quote.USD.market_cap),
          fdv: parseFloat(coin.quote.USD.fully_diluted_market_cap || coin.quote.USD.market_cap),
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
