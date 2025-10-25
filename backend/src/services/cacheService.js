const NodeCache = require('node-cache');
const logger = require('../utils/logger');
const { CACHE_TTL } = require('../utils/constants');

class CacheService {
  constructor() {
    this.cache = new NodeCache({
      stdTTL: CACHE_TTL.MEDIUM,
      checkperiod: 120,
    });
  }

  /**
   * Get value from cache
   */
  get(key) {
    try {
      return this.cache.get(key);
    } catch (error) {
      logger.error(`Cache get error: ${error.message}`);
      return null;
    }
  }

  /**
   * Set value in cache
   */
  set(key, value, ttl = CACHE_TTL.MEDIUM) {
    try {
      return this.cache.set(key, value, ttl);
    } catch (error) {
      logger.error(`Cache set error: ${error.message}`);
      return false;
    }
  }

  /**
   * Delete key from cache
   */
  del(key) {
    try {
      return this.cache.del(key);
    } catch (error) {
      logger.error(`Cache delete error: ${error.message}`);
      return 0;
    }
  }

  /**
   * Clear all cache
   */
  flush() {
    try {
      this.cache.flushAll();
      logger.info('Cache flushed successfully');
    } catch (error) {
      logger.error(`Cache flush error: ${error.message}`);
    }
  }

  /**
   * Get or set pattern - fetch from cache or execute function
   */
  async getOrSet(key, fetchFn, ttl = CACHE_TTL.MEDIUM) {
    const cached = this.get(key);
    if (cached !== undefined) {
      logger.debug(`Cache hit: ${key}`);
      return cached;
    }

    logger.debug(`Cache miss: ${key}`);
    const value = await fetchFn();
    this.set(key, value, ttl);
    return value;
  }

  /**
   * Get cache stats
   */
  getStats() {
    return this.cache.getStats();
  }
}

module.exports = new CacheService();
