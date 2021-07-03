import { Router } from 'express';

import TerritoryRoutes from './territory/territory.routes';

const router = Router();

// route "{url}/api/public/territories"
router.use('/territories', TerritoryRoutes);

export default router;
