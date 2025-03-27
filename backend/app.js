// Load .env file
require('dotenv').config();

// Load packets
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const logger = require('./src/utils/logger'); // Assicurati che il percorso sia corretto

// Initialise Express
const app = express();

// Configura Morgan per log HTTP con Winston
app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));

// Middleware per log delle richieste JSON (opzionale)
app.use((req, res, next) => {
  logger.debug(`Body ricevuto: ${JSON.stringify(req.body)}`);
  next();
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000
})
.then(() => {
  logger.info('✅ MongoDB connesso su %s', process.env.MONGO_URI.split('@')[1]); // Usa il logger Winston
})
.catch(err => {
  logger.error('❌ Errore MongoDB: %s', err.message); // Logga l'errore con stack trace
  process.exit(1);
});

// Permit requests
app.use(express.json());

// Test route
app.get('/api/health', (req, res) => {
  logger.debug('Richiesta ricevuta su /api/health'); // Livello debug
  res.json({
    status: 'Operativo',
    dbState: mongoose.STATES[mongoose.connection.readyState],
    debugMode: process.env.DEBUG === 'true'
  });
});

// Middleware per gestione errori centralizzata
app.use((err, req, res, next) => {
  logger.error('Errore non gestito:', err);
  res.status(500).json({ error: 'Errore interno del server' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, process.env.SERVER_IP, () => {
  logger.info(`🚀 Server avviato su http://${process.env.SERVER_IP || 'localhost'}:${PORT}`); // Sostituisce console.log
  
  if (process.env.DEBUG === 'true') {
    logger.debug('Modalità debug attiva');
    logger.debug(`Connessione MongoDB: ${process.env.MONGO_URI.split('@')[1]}`);
  }
});