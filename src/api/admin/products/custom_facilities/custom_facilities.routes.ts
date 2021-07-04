import ProductCustomFacility from '@src/models/product_custom_facility/product_custom_facilities.model';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

/**
 * GET /api/admin/products/:product_id/custom_facilities
 * get all product custom facilities
 */
router.get(
	'/:product_id/custom_facilities',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const customFacilities: ProductCustomFacility[] =
				await ProductCustomFacility.query().where(
					'product_id',
					req.params.product_id
				);

			res.status(200).json({
				custom_facility: customFacilities,
			});
		} catch (err) {
			next(err);
		}
	}
);

/**
 * POST /api/admin/products/:product_id/custom_facilities
 * create a new product custom facilities
 */
router.post(
	'/:product_id/custom_facilities',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const customFacility: ProductCustomFacility =
				await ProductCustomFacility.query().insert({
					...req.body,
					product_id: req.params.product_id,
				});

			res.status(200).json({
				custom_facility: customFacility,
			});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
