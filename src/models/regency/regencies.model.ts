import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './regencies.schema.json';
import Province from '../province/provinces.model';
import District from '../district/districts.model';

export default class Regency extends Model {
	id!: string;
	province_id!: string;
	name!: string;

	static tableName = tableNames.regency;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		province: {
			relation: Model.BelongsToOneRelation,
			modelClass: Province,
			join: {
				from: `${tableNames.regency}.province_id`,
				to: `${tableNames.province}.id`,
			},
		},
		districts: {
			relation: Model.HasManyRelation,
			modelClass: District,
			join: {
				from: `${tableNames.regency}.id`,
				to: `${tableNames.district}.regency_id`,
			},
		},
	});
}
