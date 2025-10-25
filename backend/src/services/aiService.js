const OpenAI = require('openai');
const config = require('../config/env');
const logger = require('../utils/logger');

class AIService {
  constructor() {
    if (config.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: config.OPENAI_API_KEY,
      });
    } else {
      logger.warn('OpenAI API key not configured');
    }
  }

  /**
   * Analyze wallet behavior
   */
  async analyzeWalletBehavior(walletData) {
    if (!this.openai) {
      throw new Error('OpenAI not configured');
    }

    try {
      const prompt = `
Analyze the following wallet behavior and provide insights:

Wallet Address: ${walletData.address}
Total Transactions: ${walletData.totalTxs}
Total Volume: $${walletData.totalVolume}
Active Days: ${walletData.activeDays}
Top Tokens: ${walletData.topTokens.join(', ')}

Recent Activity:
${JSON.stringify(walletData.recentActivity, null, 2)}

Provide:
1. Wallet type classification (Trader/Holder/Bot/DeFi User)
2. Risk level (Low/Medium/High)
3. Trading patterns and behavior
4. Predictions for future activity
`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a blockchain analyst expert specializing in on-chain data analysis.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      logger.error(`AI analysis error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Analyze token potential
   */
  async analyzeTokenPotential(tokenData) {
    if (!this.openai) {
      throw new Error('OpenAI not configured');
    }

    try {
      const prompt = `
Analyze this token and assess its potential:

Token: ${tokenData.name} (${tokenData.symbol})
Price: $${tokenData.price}
Market Cap: $${tokenData.marketCap}
24h Volume: $${tokenData.volume24h}
Holders: ${tokenData.holders}
Liquidity: $${tokenData.liquidity}

Recent Price Action:
${JSON.stringify(tokenData.priceHistory, null, 2)}

Provide:
1. Investment potential score (1-10)
2. Risk assessment
3. Key strengths and weaknesses
4. Price prediction (short-term)
`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a DeFi and crypto investment analyst.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      logger.error(`Token analysis error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Generate market insight summary
   */
  async generateMarketInsight(marketData) {
    if (!this.openai) {
      throw new Error('OpenAI not configured');
    }

    try {
      const prompt = `
Generate a concise market insight based on:

${JSON.stringify(marketData, null, 2)}

Provide a brief summary highlighting:
1. Key trends
2. Notable movements
3. Potential opportunities
4. Risk factors
`;

      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a crypto market analyst providing daily insights.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      logger.error(`Market insight error: ${error.message}`);
      throw error;
    }
  }
}

module.exports = new AIService();
