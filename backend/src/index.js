const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const config = require('./config/env');
const connectDB = require('./config/db');
const logger = require('./utils/logger');

// Import routes
const whaleRoutes = require('./routes/whaleRoutes');
const airdropRoutes = require('./routes/airdropRoutes');
const defiRoutes = require('./routes/defiRoutes');
const aiRoutes = require('./routes/aiRoutes');

// Import bots
const whaleTrackerBot = require('./bots/whaleTrackerBot');
const alertService = require('./bots/alertService');

// Initialize Express app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: config.RATE_LIMIT_WINDOW_MS,
  max: config.RATE_LIMIT_MAX_REQUESTS,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Blockchain Apps API',
    version: '1.0.0',
    endpoints: {
      whale: '/api/whale',
      airdrop: '/api/airdrop',
      defi: '/api/defi',
      ai: '/api/ai',
    },
  });
});

app.use('/api/whale', whaleRoutes);
app.use('/api/airdrop', airdropRoutes);
app.use('/api/defi', defiRoutes);
app.use('/api/ai', aiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(`Error: ${err.message}`);
  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Start server
const PORT = config.PORT;
const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT} in ${config.NODE_ENV} mode`);
  
  // Start whale tracker bot monitoring (if configured)
  if (config.TELEGRAM_BOT_TOKEN) {
    whaleTrackerBot.startMonitoring(60000); // Check every minute
    logger.info('Whale tracker bot started');
  }
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  whaleTrackerBot.stopMonitoring();
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  whaleTrackerBot.stopMonitoring();
  server.close(() => {
    logger.info('Server closed');
    process.exit(0);
  });
});

module.exports = app;
