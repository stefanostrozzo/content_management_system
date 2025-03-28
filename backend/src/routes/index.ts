import { Router } from 'express';
import healthRouter from './healthRoute'; // Import relativo
import postRoutes from './post.routes'; // Import relativo

const router = Router();

router.use('/health', healthRouter);
router.use('/posts', postRoutes);

export default router;