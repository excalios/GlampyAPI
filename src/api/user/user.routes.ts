import { Router } from 'express';

import AuthRoutes from './auth/auth.routes';

const router = Router();

// route "{url}/api/user/auth"
router.use('/auth', AuthRoutes);

export default router;
