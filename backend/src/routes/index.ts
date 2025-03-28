import { Router } from 'express';
import healthRouter from './healthRoute'; // Import relativo
<<<<<<< HEAD
import postRoutes from './post.routes'; // Import relativo

const router = Router();

router.use('/health', healthRouter);
router.use('/posts', postRoutes);

export default router;
=======
import cors from 'cors';
import corsOptions from '../config/corsConfig'; // Importa la configurazione CORS
import { createPost, getPosts } from "../controllers/postController";

const router = Router();

// Usa la configurazione CORS
router.use(cors(corsOptions));

router.use('/health', healthRouter);

router.post("/posts", createPost);
router.get("/posts", getPosts);

export default router;
>>>>>>> master
