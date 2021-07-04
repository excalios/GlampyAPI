import { Request, Response, Router } from 'express';

import TerritoryRoutes from './territory/territory.routes';
import setting from '@src/../setting';

const router = Router();

/**
 * GET /api/public/file/:filename
 * get a file from backend
 */
router.get('/file/:filename*', (req: Request, res: Response) => {
	res.sendFile(setting.PROJECT_DIR + '/public' + req.params['0']);
});

// route "{url}/api/public/territories"
router.use('/territories', TerritoryRoutes);

export default router;
