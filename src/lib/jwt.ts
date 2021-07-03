import jwt from 'jsonwebtoken';

export default function sign(payload: object): Promise<string> {
	return new Promise((resolve, reject) => {
		jwt.sign(
			payload,
			process.env.JWT_SECRET as string,
			{
				expiresIn: '1d',
			},
			(error, token) => {
				if (error) return reject(error);
				return resolve(token as string);
			}
		);
	});
}
