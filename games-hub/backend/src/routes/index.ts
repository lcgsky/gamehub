import express from 'express';
import gameRoutes from './gameRoutes';

const router = express.Router();

router.use('/games', gameRoutes);

export default router; 