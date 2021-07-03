import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './districts.schema.json';
import Regency from '../regency/regencies.model';

export default class District extends Model {
	id!: string;
	regency_id!: string;
	name!: string;

	static tableName = tableNames.district;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		regency: {
			relation: Model.BelongsToOneRelation,
			modelClass: Regency,
			join: {
				from: `${tableNames.district}.regency_id`,
				to: `${tableNames.regency}.id`,
			},
		},
	});
}
