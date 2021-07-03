import { NextFunction, Request, Response, Router } from 'express';
import Admin from '@src/models/admin/admins.model';

import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from '@src/lib/jwt';
import { Roles } from '@src/middlewares';

const router = Router();

/**
 * POST /api/user/auth/signin
 * Use to signin user
 */
router.post(
	'/signin',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const signinSchema = yup.object().shape({
				email: yup.string().email().required(),
				password: yup.string().min(8).max(100).required(),
			});

			await signinSchema
				.validate(req.body, { abortEarly: false })
				.catch((err) => {
					res.status(400);
					throw err;
				});

			const user: Admin = await Admin.query().findOne({
				email: req.body.email,
			});

			if (!user) {
				const err: Error = new Error('invalid login');
				res.status(400);
				throw err;
			}

			const isPasswordValid: boolean = await bcrypt.compare(
				req.body.password,
				user.password as string
			);

			if (!isPasswordValid) {
				const err: Error = new Error('invalid login');
				res.status(403);
				throw err;
			}

			delete user.password;

			const token: string = await jwt({
				user: user,
				roles: Roles.Admin,
			});

			res.status(200).json({
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
				token,
			});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
