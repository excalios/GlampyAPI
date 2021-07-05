import Product from '@src/models/product/products.model';
import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

/**
 * GET /api/public/products/
 * get all products for public
 */
router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
	try {
		const products: Product[] = await Product.query().withGraphJoined(
			'[province, regency, facilities, custom_facilities, images]'
		);

		res.status(200).json({
			products,
		});
	} catch (err) {
		next(err);
	}
});

/**
 * GET /api/public/products/:product_id
 * get all products for public
 */
router.get(
	'/:product_id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const product: Product = await Product.query()
				.findOne('product.id', req.params.product_id)
				.withGraphJoined(
					'[province, regency, variations.[facilities, custom_facilities.[images], images], facilities, custom_facilities.[images], images, reviews]'
				);

			res.status(200).json({
				product,
			});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
