const express = require('express');
const router = express.Router();
const whaleController = require('../controllers/whaleController');

// Get whale wallets
router.get('/whales', whaleController.getWhaleWallets.bind(whaleController));

// Track specific wallet
router.get('/track/:address', whaleController.trackWallet.bind(whaleController));

// Get recent whale transactions
router.get('/transactions/recent', whaleController.getRecentWhaleTransactions.bind(whaleController));

// Analyze wallet
router.get('/analyze/:address', whaleController.analyzeWallet.bind(whaleController));

module.exports = router;
