import Product from '@src/models/product/products.model';
import { NextFunction, Request, Response, Router } from 'express';

import VariationRoutes from './variations/variations.routes';
import ImageRoutes from './images/images.routes';
import FacilityRoutes from './facilities/facilities.routes';
import CustomFacilityRoutes from './custom_facilities/custom_facilities.routes';
const router = Router();

/**
 * GET /api/admin/products
 * get all products
 */
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const products: Product[] = await Product.query()
			.select(
				'product.*',
				'province.name as province',
				'regency.name as regency'
			)
			.joinRelated('[province, regency]');

		res.status(200).json({
			products,
		});
	} catch (err) {
		next(err);
	}
});

/**
 * POST /api/admin/products
 * create a new product
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const product: Product = await Product.query().insert(req.body);

		res.status(200).json({
			product,
		});
	} catch (err) {
		next(err);
	}
});

router.use('/', VariationRoutes);
router.use('/', ImageRoutes);
router.use('/', FacilityRoutes);
router.use('/', CustomFacilityRoutes);

export default router;
