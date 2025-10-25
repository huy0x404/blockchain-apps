const express = require('express');
const router = express.Router();
const defiController = require('../controllers/defiController');

// Get all protocols
router.get('/protocols', defiController.getProtocols.bind(defiController));

// Get top protocols
router.get('/protocols/top', defiController.getTopProtocols.bind(defiController));

// Get protocol details
router.get('/protocols/:name', defiController.getProtocolDetails.bind(defiController));

// Get total TVL
router.get('/tvl', defiController.getTotalTVL.bind(defiController));

// Get chains
router.get('/chains', defiController.getChains.bind(defiController));

// Get yield pools
router.get('/pools', defiController.getYieldPools.bind(defiController));

// Get token price
router.get('/prices', defiController.getTokenPrice.bind(defiController));

// Search token
router.get('/search', defiController.searchToken.bind(defiController));

// Get token pairs
router.get('/pairs/:chain/:address', defiController.getTokenPairs.bind(defiController));

module.exports = router;
