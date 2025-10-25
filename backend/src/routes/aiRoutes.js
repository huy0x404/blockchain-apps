const express = require('express');
const router = express.Router();
const aiAnalyzerController = require('../controllers/aiAnalyzerController');

// Analyze wallet with AI
router.get('/wallet/:address', aiAnalyzerController.analyzeWallet.bind(aiAnalyzerController));

// Analyze token with AI
router.get('/token/:chain/:address', aiAnalyzerController.analyzeToken.bind(aiAnalyzerController));

// Generate market insights
router.post('/insights', aiAnalyzerController.generateMarketInsight.bind(aiAnalyzerController));

// Predict wallet behavior
router.get('/predict/:address', aiAnalyzerController.predictBehavior.bind(aiAnalyzerController));

module.exports = router;
