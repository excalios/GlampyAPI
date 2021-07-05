import User from '@src/models/user/users.model';
import ProductOrder from '@src/models/product_order/product_orders.model';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

/**
 * POST /api/user/order
 * Create a new order for booking a glamping
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const user: User = await User.query().findById(req.userData.id);

		if (!user.vaccine_certificate) {
			const err: Error = new Error("User hasn't been vaccinated");
			res.status(400);
			throw err;
		}

		const order: ProductOrder = await ProductOrder.query().insert({
			...req.body,
			user_id: req.userData.id,
		});

		res.status(200).json({
			order,
		});
	} catch (err) {
		next(err);
	}
});

export default router;
