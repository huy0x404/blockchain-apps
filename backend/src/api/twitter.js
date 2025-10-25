const config = require('../config/env');
const fetchService = require('../services/fetchService');
const logger = require('../utils/logger');

class TwitterAPI {
  constructor() {
    this.bearerToken = config.TWITTER_BEARER_TOKEN;
    this.baseURL = 'https://api.twitter.com/2';
  }

  /**
   * Get headers for authentication
   */
  getHeaders() {
    return {
      Authorization: `Bearer ${this.bearerToken}`,
    };
  }

  /**
   * Search recent tweets
   */
  async searchTweets(query, maxResults = 10) {
    try {
      if (!this.bearerToken) {
        throw new Error('Twitter API not configured');
      }

      const data = await fetchService.get(`${this.baseURL}/tweets/search/recent`, {
        params: {
          query,
          max_results: maxResults,
          'tweet.fields': 'created_at,public_metrics,entities',
          'user.fields': 'username,verified',
          expansions: 'author_id',
        },
        headers: this.getHeaders(),
      });

      return data;
    } catch (error) {
      logger.error(`Twitter searchTweets error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Search airdrop-related tweets
   */
  async searchAirdropTweets(projectName = '') {
    const query = projectName 
      ? `${projectName} (airdrop OR "free tokens" OR giveaway) -is:retweet`
      : '(airdrop OR "free tokens") crypto -is:retweet';
    
    return await this.searchTweets(query, 20);
  }

  /**
   * Search whale alert tweets
   */
  async searchWhaleAlerts() {
    const query = 'from:whale_alert';
    return await this.searchTweets(query, 10);
  }

  /**
   * Get user tweets
   */
  async getUserTweets(userId, maxResults = 10) {
    try {
      if (!this.bearerToken) {
        throw new Error('Twitter API not configured');
      }

      const data = await fetchService.get(`${this.baseURL}/users/${userId}/tweets`, {
        params: {
          max_results: maxResults,
          'tweet.fields': 'created_at,public_metrics',
        },
        headers: this.getHeaders(),
      });

      return data;
    } catch (error) {
      logger.error(`Twitter getUserTweets error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new TwitterAPI();
