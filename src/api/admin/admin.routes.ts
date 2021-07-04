import { Router } from 'express';

import AuthRoutes from './auth/auth.routes';
import ProductRoutes from './products/products.routes';

const router = Router();

// route "{url}/api/user/auth"
router.use('/auth', AuthRoutes);
router.use('/products', ProductRoutes);

export default router;
