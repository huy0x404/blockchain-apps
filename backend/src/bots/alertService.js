const telegramService = require('../services/telegramService');
const logger = require('../utils/logger');

class AlertService {
  constructor() {
    this.alerts = [];
    this.subscribers = new Map();
  }

  /**
   * Subscribe to alerts
   */
  subscribe(type, callback) {
    if (!this.subscribers.has(type)) {
      this.subscribers.set(type, []);
    }
    this.subscribers.get(type).push(callback);
  }

  /**
   * Unsubscribe from alerts
   */
  unsubscribe(type, callback) {
    if (this.subscribers.has(type)) {
      const callbacks = this.subscribers.get(type);
      const index = callbacks.indexOf(callback);
      if (index > -1) {
        callbacks.splice(index, 1);
      }
    }
  }

  /**
   * Trigger alert
   */
  async trigger(type, data) {
    logger.info(`Alert triggered: ${type}`, data);

    // Save alert
    this.alerts.push({
      type,
      data,
      timestamp: new Date(),
    });

    // Keep only last 100 alerts
    if (this.alerts.length > 100) {
      this.alerts.shift();
    }

    // Notify subscribers
    if (this.subscribers.has(type)) {
      const callbacks = this.subscribers.get(type);
      for (const callback of callbacks) {
        try {
          await callback(data);
        } catch (error) {
          logger.error(`Alert callback error: ${error.message}`);
        }
      }
    }

    // Send Telegram notification
    await this.sendTelegramAlert(type, data);
  }

  /**
   * Send Telegram alert
   */
  async sendTelegramAlert(type, data) {
    try {
      switch (type) {
        case 'whale_transaction':
          await telegramService.sendWhaleAlert(data);
          break;
        
        case 'new_airdrop':
          await telegramService.sendAirdropAlert(data);
          break;
        
        case 'price_change':
          await telegramService.sendPriceAlert(
            data.token,
            data.oldPrice,
            data.newPrice,
            data.changePercent
          );
          break;
        
        default:
          await telegramService.sendMessage(`Alert: ${type}\n${JSON.stringify(data, null, 2)}`);
      }
    } catch (error) {
      logger.error(`Telegram alert error: ${error.message}`);
    }
  }

  /**
   * Get recent alerts
   */
  getRecentAlerts(limit = 20) {
    return this.alerts.slice(-limit).reverse();
  }

  /**
   * Clear alerts
   */
  clearAlerts() {
    this.alerts = [];
  }
}

module.exports = new AlertService();
