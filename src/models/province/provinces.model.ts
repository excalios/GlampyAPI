import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './provinces.schema.json';
import Regency from '../province/provinces.model';

export default class Province extends Model {
	id!: string;
	name!: string;

	static tableName = tableNames.province;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		regencies: {
			relation: Model.HasManyRelation,
			modelClass: Regency,
			join: {
				from: `${tableNames.province}.id`,
				to: `${tableNames.regency}.province_id`,
			},
		},
	});
}
