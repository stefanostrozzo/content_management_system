import { Request, Response, Router } from 'express';
import mongoose from 'mongoose';
import logger from '../utils/logger';

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  logger.debug('Richiesta health check');
  res.json({
    status: 'Operativo',
    dbState: mongoose.STATES[mongoose.connection.readyState],
    debugMode: process.env.DEBUG === 'true'
  });
});

export default router;