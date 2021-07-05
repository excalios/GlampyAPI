import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import Province from '../province/provinces.model';
import Regency from '../regency/regencies.model';

import jsonSchema from './users.schema.json';

export default class User extends Model {
	id!: string;
	name!: string;
	email!: string;
	password?: string;
	poin?: number;
	province_id?: string;
	regency_id?: string;
	district_id?: string;
	vaccine_certificate?: string;

	static tableName = tableNames.user;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		province: {
			relation: Model.BelongsToOneRelation,
			modelClass: Province,
			join: {
				from: `${tableNames.user}.province_id`,
				to: `${tableNames.province}.id`,
			},
		},
		regency: {
			relation: Model.BelongsToOneRelation,
			modelClass: Regency,
			join: {
				from: `${tableNames.user}.regency_id`,
				to: `${tableNames.regency}.id`,
			},
		},
	});
}
