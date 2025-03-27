import 'dotenv/config';
import express, { Express } from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import logger from './src/utils/logger';
import router from './src/routes';
import 'module-alias/register';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(morgan('combined', {
  stream: { write: (message: string) => logger.info(message.trim()) }
}));

// Connessione DB
mongoose.connect(process.env.MONGO_URI!, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 30000
})
.then(() => logger.info('✅ MongoDB connesso'))
.catch((err: Error) => {
  logger.error(`❌ Errore MongoDB: ${err.message}`);
  process.exit(1);
});

// Routes
app.use('/api', router);

// Avvio server
const PORT = parseInt(process.env.PORT || '3000');
app.listen(PORT, () => {
  logger.info(`🚀 Server avviato su porta ${PORT}`);
});