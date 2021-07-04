import ProductFacility from '@src/models/product_facility/product_facilities.model';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

/**
 * GET /api/admin/products/:product_id/facilities
 * get all product facilities
 */
router.get(
	'/:product_id/facilities',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const facilities: ProductFacility[] = await ProductFacility.query()
				.where('product_id', req.params.product_id)
				.joinRelated('facility')
				.select('facility.*');

			res.status(200).json({
				facilities,
			});
		} catch (err) {
			next(err);
		}
	}
);

/**
 * POST /api/admin/products/:product_id/facilities
 * create a new product facilities
 */
router.post(
	'/:product_id/facilities',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const facility: ProductFacility = await ProductFacility.query()
				.insert({
					...req.body,
					product_id: req.params.product_id,
				})
				.joinRelated('facility');

			res.status(200).json({
				facility,
			});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
