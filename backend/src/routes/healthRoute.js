const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Custom logger (puoi importarlo da un file shared/logger.js)
const logger = {
  log: (...args) => {
    if (process.env.DEBUG === 'true') {
      console.log('[DEBUG]', ...args);
    }
  }
};

router.get('/', (req, res) => {
  logger.log('Richiesta ricevuta su /api/health');
  res.json({
    status: 'Operativo',
    dbState: mongoose.STATES[mongoose.connection.readyState],
    debugMode: process.env.DEBUG === 'true'
  });
});

module.exports = router;