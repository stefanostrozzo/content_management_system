const winston = require('winston');
const { combine, timestamp, printf, colorize, errors } = winston.format;

// Formatto custom per i log
const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}]: ${stack || message}`;
});

// Logger principale
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize(),
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }), // Mostra stack trace per errori
    logFormat
  ),
  transports: [
    // Log su console (solo in sviluppo)
    new winston.transports.Console(),
    // Log su file (solo in produzione)
    process.env.NODE_ENV === 'production' &&
      new winston.transports.File({ filename: 'logs/combined.log' }),
    // Log degli errori in un file separato
    process.env.NODE_ENV === 'production' &&
      new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ].filter(Boolean), // Filtra i trasporti falsy (es. se non in produzione)
});

module.exports = logger;