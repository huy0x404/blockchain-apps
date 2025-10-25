const TelegramBot = require('node-telegram-bot-api');
const config = require('../config/env');
const etherscanAPI = require('../api/etherscan');
const telegramService = require('../services/telegramService');
const logger = require('../utils/logger');
const { weiToEther } = require('../utils/helpers');

class WhaleTrackerBot {
  constructor() {
    if (!config.TELEGRAM_BOT_TOKEN) {
      logger.warn('Telegram bot not configured');
      return;
    }

    this.bot = new TelegramBot(config.TELEGRAM_BOT_TOKEN, { polling: true });
    this.watchlist = new Set();
    this.isRunning = false;
    this.setupCommands();
  }

  /**
   * Setup bot commands
   */
  setupCommands() {
    // /start command
    this.bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(
        chatId,
        '🐋 Welcome to Whale Tracker Bot!\n\n' +
        'Commands:\n' +
        '/watch <address> - Add wallet to watchlist\n' +
        '/unwatch <address> - Remove wallet from watchlist\n' +
        '/list - Show watchlist\n' +
        '/track <address> - Get wallet info\n' +
        '/help - Show this message'
      );
    });

    // /help command
    this.bot.onText(/\/help/, (msg) => {
      const chatId = msg.chat.id;
      this.bot.sendMessage(
        chatId,
        '📋 Available Commands:\n\n' +
        '/watch <address> - Add wallet to watchlist\n' +
        '/unwatch <address> - Remove wallet from watchlist\n' +
        '/list - Show watchlist\n' +
        '/track <address> - Get wallet information\n' +
        '/stats - Show bot statistics'
      );
    });

    // /watch command
    this.bot.onText(/\/watch (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const address = match[1].trim();
      
      this.watchlist.add(address.toLowerCase());
      this.bot.sendMessage(
        chatId,
        `✅ Now watching wallet:\n<code>${address}</code>`,
        { parse_mode: 'HTML' }
      );
      
      logger.info(`Added ${address} to watchlist`);
    });

    // /unwatch command
    this.bot.onText(/\/unwatch (.+)/, (msg, match) => {
      const chatId = msg.chat.id;
      const address = match[1].trim();
      
      this.watchlist.delete(address.toLowerCase());
      this.bot.sendMessage(
        chatId,
        `❌ Stopped watching wallet:\n<code>${address}</code>`,
        { parse_mode: 'HTML' }
      );
      
      logger.info(`Removed ${address} from watchlist`);
    });

    // /list command
    this.bot.onText(/\/list/, (msg) => {
      const chatId = msg.chat.id;
      
      if (this.watchlist.size === 0) {
        this.bot.sendMessage(chatId, 'Watchlist is empty. Use /watch to add wallets.');
        return;
      }
      
      const list = Array.from(this.watchlist)
        .map((addr, i) => `${i + 1}. <code>${addr}</code>`)
        .join('\n');
      
      this.bot.sendMessage(
        chatId,
        `📝 Watchlist (${this.watchlist.size}):\n\n${list}`,
        { parse_mode: 'HTML' }
      );
    });

    // /track command
    this.bot.onText(/\/track (.+)/, async (msg, match) => {
      const chatId = msg.chat.id;
      const address = match[1].trim();
      
      try {
        this.bot.sendMessage(chatId, '🔍 Fetching wallet data...');
        
        const balance = await etherscanAPI.getBalance(address);
        const txs = await etherscanAPI.getTransactions(address, 0, 99999999, 1, 10);
        
        const message = `
🔍 <b>Wallet Info</b>

<b>Address:</b> <code>${address}</code>
<b>Balance:</b> ${balance.toFixed(4)} ETH
<b>Total Transactions:</b> ${txs.length}
<b>Latest TX:</b> ${txs[0] ? new Date(txs[0].timeStamp * 1000).toLocaleString() : 'N/A'}

<a href="https://etherscan.io/address/${address}">View on Etherscan</a>
        `.trim();
        
        this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
      } catch (error) {
        this.bot.sendMessage(chatId, `❌ Error: ${error.message}`);
        logger.error(`Track command error: ${error.message}`);
      }
    });

    // /stats command
    this.bot.onText(/\/stats/, (msg) => {
      const chatId = msg.chat.id;
      
      const message = `
📊 <b>Bot Statistics</b>

<b>Watchlist Size:</b> ${this.watchlist.size}
<b>Status:</b> ${this.isRunning ? '🟢 Running' : '🔴 Stopped'}
<b>Uptime:</b> ${process.uptime().toFixed(0)}s
      `.trim();
      
      this.bot.sendMessage(chatId, message, { parse_mode: 'HTML' });
    });
  }

  /**
   * Start monitoring watchlist
   */
  startMonitoring(intervalMs = 60000) {
    if (this.isRunning) {
      logger.warn('Monitoring already running');
      return;
    }

    this.isRunning = true;
    logger.info('Started whale tracker monitoring');

    this.monitorInterval = setInterval(async () => {
      for (const address of this.watchlist) {
        try {
          await this.checkWalletActivity(address);
        } catch (error) {
          logger.error(`Monitor error for ${address}: ${error.message}`);
        }
      }
    }, intervalMs);
  }

  /**
   * Stop monitoring
   */
  stopMonitoring() {
    if (this.monitorInterval) {
      clearInterval(this.monitorInterval);
      this.isRunning = false;
      logger.info('Stopped whale tracker monitoring');
    }
  }

  /**
   * Check wallet activity
   */
  async checkWalletActivity(address) {
    const txs = await etherscanAPI.getTransactions(address, 0, 99999999, 1, 1);
    
    if (txs.length > 0) {
      const latestTx = txs[0];
      const value = weiToEther(latestTx.value);
      
      // Check if it's a large transaction
      if (value >= config.WHALE_THRESHOLD_ETH) {
        await telegramService.sendWhaleAlert({
          type: 'Transfer',
          amount: value.toFixed(4),
          symbol: 'ETH',
          valueUSD: value * 2000, // Simplified, should get real price
          from: latestTx.from,
          to: latestTx.to,
          hash: latestTx.hash,
        });
      }
    }
  }
}

module.exports = new WhaleTrackerBot();
