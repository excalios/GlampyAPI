import User from '@src/models/user/users.model';
import ProductOrder from '@src/models/product_order/product_orders.model';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

/**
 * GET /api/user/profile
 * Get profile data and booking history
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: User = await User.query()
			.findById(req.userData.id)
			.joinRelated('[province, regency]')
			.select('user.*', 'province.name as province', 'regency.name as regency');

		const order: ProductOrder[] = await ProductOrder.query().withGraphJoined(
			'[product.[province, regency], variation]'
		);

		res.status(200).json({
			user,
			order,
		});
	} catch (err) {
		next(err);
	}
});

export default router;
