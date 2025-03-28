import { Router } from 'express';
import healthRouter from './healthRoute'; // Import relativo
import postRoutes from './post.routes'; // Import relativo
import corsOptions from '../config/corsConfig'; // Importa la configurazione CORS
import cors from 'cors';

const router = Router();

// Usa la configurazione CORS
router.use(cors(corsOptions));

router.use('/health', healthRouter);
router.use('/posts', postRoutes);

export default router;
