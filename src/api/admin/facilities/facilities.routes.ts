import Facility from '@src/models/facility/facilities.model';
import { NextFunction, Request, Response, Router } from 'express';

import setting from '@src/../setting';
import multer from 'multer';
import mime from 'mime-types';

const router = Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, setting.PROJECT_DIR + '/public/facilities');
	},
	filename: (req, file, cb) => {
		const fileName: string = req.body.name.replace(/[^\w\d]/g, '');
		const ext = mime.extension(file.mimetype);
		cb(null, fileName + '-' + file.fieldname + '-' + Date.now() + '.' + ext);
	},
});

const upload = multer({ storage });

/**
 * GET /api/admin/facilities
 * get all facilities
 */
router.get('/', async (req: Request, res: Response, next: NextFunction) => {
	try {
		const facilities: Facility[] = await Facility.query();

		res.status(200).json({
			facilities,
		});
	} catch (err) {
		next(err);
	}
});

/**
 * POST /api/admin/facilities
 * create a new facilities image
 */
router.post(
	'/',
	upload.single('icon'),
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			req.body.icon = req.file?.path.replace(setting.PROJECT_DIR, '');

			const facility: Facility = await Facility.query().insert(req.body);

			res.status(200).json({
				facility,
			});
		} catch (err) {
			next(err);
		}
	}
);

export default router;
