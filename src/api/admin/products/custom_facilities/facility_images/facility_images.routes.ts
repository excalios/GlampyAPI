import FacilityImage from '@src/models/facility_image/facility_images.model';
import { NextFunction, Request, Response, Router } from 'express';

import setting from '@src/../setting';
import multer from 'multer';
import mime from 'mime-types';

const router = Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, setting.PROJECT_DIR + '/public/product/facility_images');
	},
	filename: (req, file, cb) => {
		const fileName: string = req.body.title.replace(/[^\w\d]/g, '');
		const ext = mime.extension(file.mimetype);
		cb(null, fileName + '-' + file.fieldname + '-' + Date.now() + '.' + ext);
	},
});

const upload = multer({ storage });

/**
 * GET /api/admin/products/:product_id/custom_facility/:custom_facility_id/images
 * get all facility images
 */
router.get(
	'/:custom_facility_id/images',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const images: FacilityImage[] = await FacilityImage.query().where(
				'custom_facility_id',
				req.params.custom_facility_id
			);

			res.status(200).json({
				images,
			});
		} catch (err) {
			next(err);
		}
	}
);

/**
 * POST /api/admin/products/:product_id/custom_facility/:custom_facility_id/images
 * create a new facility image
 */
router.post(
	'/:custom_facility_id/images',
	upload.single('image'),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body.image = req.file?.path.replace(setting.PROJECT_DIR, '');

			const image: FacilityImage = await FacilityImage.query().insert({
				...req.body,
				custom_facility_id: req.params.custom_facility_id,
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
