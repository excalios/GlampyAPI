import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

/**
 * Verify jwt token for authentication
 * Whether the user is autharized or not for the requested routes
 */
export enum Roles {
	Admin,
	User,
}

export function verifyToken(role: Roles) {
	return (req: any, res: Response, next: NextFunction) => {
		const bearedHeader: string = req.headers['authorization'];

		if (bearedHeader) {
			const bearer = bearedHeader.split(' ');
			const token = bearer[1];

			try {
				const userData: any = jwt.verify(
					token,
					process.env.JWT_SECRET as string
				);
				if (userData.role !== role) {
					const err: Error = new Error('Unathorized Role');
					res.status(403);
					throw err;
				}
				req.token = token;
				req.userData = userData;
				next();
			} catch (error) {
				next(error);
			}
		} else {
			res.sendStatus(403);
		}
	};
}

export function verifyXenditCallbackToken(
	req: any,
	res: Response,
	next: NextFunction
) {
	const callbackTokenHeader: string = req.headers['x-callback-token'];

	if (callbackTokenHeader === process.env.XENDIT_CALLBACK_TOKEN) {
		next();
	} else {
		res.sendStatus(403);
	}
}

/**
 * Non existing routes error handler
 */
export function notFound(req: Request, res: Response, next: NextFunction) {
	const error = new Error(`Not Found at ${req.originalUrl}`);
	res.status(404);
	next(error);
}

export function errorHandler(
	error: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		status: statusCode,
		message: error.message,
		stack: process.env.NODE_ENV === 'production' ? 'XoX' : error.stack,
		errors: error.errors || error.message || undefined,
	});
}
