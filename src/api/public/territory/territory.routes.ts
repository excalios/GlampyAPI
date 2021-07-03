import District from '@src/models/district/districts.model';
import Province from '@src/models/province/provinces.model';
import Regency from '@src/models/regency/regencies.model';
import { NextFunction, Request, Response, Router } from 'express';

const router = Router();

/**
 * GET /api/public/territories/provinces
 * Get all the provinces
 */
router.get(
	'/provinces',
	async (_req: Request, res: Response, next: NextFunction) => {
		try {
			const provinces: Province[] = await Province.query();

			res.status(200).json({ provinces });
		} catch (err) {
			next(err);
		}
	}
);

/**
 * GET /api/public/territories/regencies/:province_id
 * Get all the regencies based on the province
 */
router.get(
	'/regencies/:province_id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const regencies: Regency[] = await Regency.query().where(
				'province_id',
				req.params.province_id
			);

			res.status(200).json({ regencies });
		} catch (err) {
			next(err);
		}
	}
);

/**
 * GET /api/public/territories/districts/:regency_id
 * Get all the regencies based on the province
 */
router.get(
	'/districts/:regency_id',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const districts: District[] = await District.query().where(
				'regency_id',
				req.params.regency_id
			);

			res.status(200).json({ regencies: districts });
		} catch (err) {
			next(err);
		}
	}
);

export default router;
