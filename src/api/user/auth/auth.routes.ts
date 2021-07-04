import User from '@src/models/user/users.model';
import { NextFunction, Request, Response, Router } from 'express';

import * as yup from 'yup';
import bcrypt from 'bcrypt';
import jwt from '@src/lib/jwt';
import { Roles } from '@src/middlewares';
import setting from '@src/../setting';
import multer from 'multer';
import mime from 'mime-types';

const router = Router();

// Where to save the certificates and set the filename
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, setting.PROJECT_DIR + '/public/certificates');
	},
	filename: (req, file, cb) => {
		const fileName: string = req.body.name.replace(/[^\w\d]/g, '');
		const ext = mime.extension(file.mimetype);
		cb(null, fileName + '-' + file.fieldname + '-' + Date.now() + '.' + ext);
	},
});

const upload = multer({ storage });

/**
 * POST /api/user/auth/signup
 * Use to signup user
 */
router.post(
	'/signup',
	upload.single('vaccine_certificate'),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const signupSchema = yup.object().shape({
				name: yup.string().required(),
				email: yup.string().email().required(),
				password: yup.string().min(8).max(100).required(),
				province_id: yup.string().required(),
				regency_id: yup.string().required(),
				district_id: yup.string().required(),
				vaccine_certificate: yup.mixed().required(),
			});

			req.body.vaccine_certificate = req.file?.path.replace(
				setting.PROJECT_DIR,
				''
			);

			await signupSchema
				.validate(req.body, { abortEarly: false })
				.catch((err) => {
					res.status(400);
					throw err;
				});

			const isUserExist: User = await User.query().findOne({
				email: req.body.email,
			});

			if (isUserExist) {
				const err: Error = new Error('User already exist');
				res.status(400);
				throw err;
			}

			const hashedPassword: string = await bcrypt.hash(req.body.password, 12);
			const registeredUser: User = await User.query().insert({
				...req.body,
				password: hashedPassword,
			});

			delete registeredUser.password;

			const token: string = await jwt({
				user: registeredUser,
				roles: Roles.User,
			});

			res.status(200).json({
				user: {
					id: registeredUser.id,
					name: registeredUser.name,
					email: registeredUser.email,
					poin: registeredUser.poin,
				},
				token,
			});
		} catch (err) {
			next(err);
		}
	}
);

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

			const user: User = await User.query().findOne({
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
				roles: Roles.User,
			});

			res.status(200).json({
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
					poin: user.poin,
				},
				token,
			});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
