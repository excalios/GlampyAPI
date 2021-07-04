import ProductImage from '@src/models/product_image/product_images.model';
import { NextFunction, Request, Response, Router } from 'express';

import setting from '@src/../setting';
import multer from 'multer';
import mime from 'mime-types';

const router = Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, setting.PROJECT_DIR + '/public/product/images');
	},
	filename: (req, file, cb) => {
		const fileName: string = req.body.title.replace(/[^\w\d]/g, '');
		const ext = mime.extension(file.mimetype);
		cb(null, fileName + '-' + file.fieldname + '-' + Date.now() + '.' + ext);
	},
});

const upload = multer({ storage });

/**
 * GET /api/admin/products/:product_id/images
 * get all product images
 */
router.get(
	'/:product_id/images',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const images: ProductImage[] = await ProductImage.query().where(
				'product_id',
				req.params.product_id
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
 * POST /api/admin/products/:product_id/images
 * create a new product image
 */
router.post(
	'/:product_id/images',
	upload.single('image'),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body.image = req.file?.path.replace(setting.PROJECT_DIR, '');
			req.body.is_variation = req.body.is_variation.toLowerCase() === 'true';

			const image: ProductImage = await ProductImage.query().insert({
				...req.body,
				product_id: req.params.product_id,
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
