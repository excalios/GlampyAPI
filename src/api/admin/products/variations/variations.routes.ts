import ProductVariation from '@src/models/product_variation/product_variations.model';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

/**
 * GET /api/admin/products/:product_id/variations
 * get all product variations
 */
router.get(
	'/:product_id/variations',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const variations: ProductVariation[] =
				await ProductVariation.query().where(
					'product_id',
					req.params.product_id
				);

			res.status(200).json({
				variations,
			});
		} catch (err) {
			next(err);
		}
	}
);

/**
 * POST /api/admin/products/:product_id/variations
 * create a new product variation
 */
router.post(
	'/:product_id/variations',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const variation: ProductVariation = await ProductVariation.query().insert(
				req.body
			);

			res.status(200).json({
				variation,
			});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
