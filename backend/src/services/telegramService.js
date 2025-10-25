const TelegramBot = require('node-telegram-bot-api');
const config = require('../config/env');
const logger = require('../utils/logger');

class TelegramService {
  constructor() {
    if (config.TELEGRAM_BOT_TOKEN) {
      this.bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN, { polling: false });
      this.chatId = config.TELEGRAM_CHAT_ID;
    } else {
      logger.warn('Telegram bot token not configured');
    }
  }

  /**
   * Send text message
   */
  async sendMessage(text, options = {}) {
    if (!this.bot || !this.chatId) {
      logger.warn('Telegram not configured, skipping message');
      return null;
    }

    try {
      return await this.bot.sendMessage(this.chatId, text, {
        parse_mode: 'HTML',
        ...options,
      });
    } catch (error) {
      logger.error(`Telegram send error: ${error.message}`);
      throw error;
    }
  }

  /**
   * Send whale alert
   */
  async sendWhaleAlert(transaction) {
    const message = `
🐋 <b>WHALE ALERT!</b>

<b>Type:</b> ${transaction.type}
<b>Amount:</b> ${transaction.amount} ${transaction.symbol}
<b>Value:</b> $${transaction.valueUSD.toLocaleString()}
<b>From:</b> <code>${transaction.from}</code>
<b>To:</b> <code>${transaction.to}</code>
<b>Hash:</b> <code>${transaction.hash}</code>

<a href="https://etherscan.io/tx/${transaction.hash}">View on Etherscan</a>
    `.trim();

    return await this.sendMessage(message);
  }

  /**
   * Send airdrop alert
   */
  async sendAirdropAlert(airdrop) {
    const message = `
🎁 <b>NEW AIRDROP!</b>

<b>Project:</b> ${airdrop.name}
<b>Chain:</b> ${airdrop.chain}
<b>Estimated Value:</b> $${airdrop.estimatedValue}
<b>Deadline:</b> ${airdrop.deadline}

<b>Requirements:</b>
${airdrop.requirements}

<a href="${airdrop.url}">More Info</a>
    `.trim();

    return await this.sendMessage(message);
  }

  /**
   * Send price alert
   */
  async sendPriceAlert(token, oldPrice, newPrice, changePercent) {
    const emoji = changePercent > 0 ? '📈' : '📉';
    const message = `
${emoji} <b>PRICE ALERT: ${token}</b>

<b>Old Price:</b> $${oldPrice.toFixed(4)}
<b>New Price:</b> $${newPrice.toFixed(4)}
<b>Change:</b> ${changePercent > 0 ? '+' : ''}${changePercent.toFixed(2)}%
    `.trim();

    return await this.sendMessage(message);
  }
}

module.exports = new TelegramService();
