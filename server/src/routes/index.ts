import type { Request, Response } from 'express';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import authRoutes from './auth-routes.js';
import apiRoutes from './api/index.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const router = express.Router();

router.use('/api', apiRoutes);
router.use('/auth', authRoutes);

// serve up react front-end in production
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;

