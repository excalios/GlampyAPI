import { Router } from 'express';

import UserRoutes from './user/user.routes';
import AdminRoutes from './admin/admin.routes';

const router = Router();

// route "{url}/api/user"
router.use('/user', UserRoutes);

// route "{url}/api/admin"
router.use('/admin', AdminRoutes);

export default router;
