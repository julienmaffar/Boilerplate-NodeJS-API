import { Router } from 'express';
import { PostRoutes } from '../contants';
import postRoutes from './PostRoutes';

const router = Router();

router.use(PostRoutes.BASE, postRoutes);

export default router;
