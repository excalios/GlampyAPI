import { NextFunction, Request, Response, Router } from 'express';
import Review from '@src/models/review/review.model';
import ReviewImage from '@src/models/review_image/review_images.model';

import setting from '@src/../setting';
import multer from 'multer';
import mime from 'mime-types';

const router = Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, setting.PROJECT_DIR + '/public/product/images');
	},
	filename: (req, file, cb) => {
		const ext = mime.extension(file.mimetype);
		cb(null, file.fieldname + '-' + Date.now() + '.' + ext);
	},
});

const upload = multer({ storage });

/**
 * POST /api/user/review
 * create a new review
 */
router.post('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const review: Review = await Review.query().insert({
			...req.body,
			user_id: req.userData.id,
		});

		res.status(200).json({
			review,
		});
	} catch (err) {
		next(err);
	}
});

/**
 * POST /api/user/review/images
 * create a new review image
 */
router.post(
	'/images',
	upload.single('image'),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body.image = req.file?.path.replace(setting.PROJECT_DIR, '');

			const image: ReviewImage = await ReviewImage.query().insert({
				...req.body,
			});

			res.status(200).json({
				image,
			});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
