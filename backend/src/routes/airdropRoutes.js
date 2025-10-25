const express = require('express');
const router = express.Router();
const airdropController = require('../controllers/airdropController');

// Get all airdrops
router.get('/', airdropController.getAirdrops.bind(airdropController));

// Get active airdrops
router.get('/active', airdropController.getActiveAirdrops.bind(airdropController));

// Get upcoming airdrops
router.get('/upcoming', airdropController.getUpcomingAirdrops.bind(airdropController));

// Search airdrops from Twitter
router.get('/search/twitter', airdropController.searchFromTwitter.bind(airdropController));

// Get airdrop by ID
router.get('/:id', airdropController.getAirdropById.bind(airdropController));

// Create new airdrop
router.post('/', airdropController.createAirdrop.bind(airdropController));

// Update airdrop
router.put('/:id', airdropController.updateAirdrop.bind(airdropController));

// Delete airdrop
router.delete('/:id', airdropController.deleteAirdrop.bind(airdropController));

module.exports = router;
