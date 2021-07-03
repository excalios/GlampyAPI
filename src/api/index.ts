import { Router } from 'express';

import UserRoutes from './user/user.routes';
import AdminRoutes from './admin/admin.routes';
import PublicRoutes from './public/public.routes';

const router = Router();

// route "{url}/api/user"
router.use('/user', UserRoutes);

// route "{url}/api/admin"
router.use('/admin', AdminRoutes);

// route "{url}/api/public"
router.use('/public', PublicRoutes);

export default router;
