import { Router } from 'express';
import healthRouter from './healthRoute'; // Import relativo

const router = Router();
router.use('/health', healthRouter);
export default router;