import { Roles, verifyToken } from '@src/middlewares';
import { Router } from 'express';

import AuthRoutes from './auth/auth.routes';
import OrderRoutes from './order/order.routes';
import ProfileRoutes from './profile/profile.routes';

const router = Router();

// route "{url}/api/user/auth"
router.use('/auth', AuthRoutes);

router.use(verifyToken(Roles.User));
// route "{url}/api/user/order"
router.use('/order', OrderRoutes);
// route "{url}/api/user/profile"
router.use('/profile', ProfileRoutes);

export default router;
