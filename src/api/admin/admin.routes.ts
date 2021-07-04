import { Router } from 'express';

import AuthRoutes from './auth/auth.routes';
import ProductRoutes from './products/products.routes';
import FacilityRoutes from './facilities/facilities.routes';

import { verifyToken, Roles } from '@src/middlewares';

const router = Router();

// route "{url}/api/user/auth"
router.use('/auth', AuthRoutes);
router.use(verifyToken(Roles.Admin));
router.use('/products', ProductRoutes);
router.use('/facilities', FacilityRoutes);

export default router;
