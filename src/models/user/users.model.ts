import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './users.schema.json';

export class User extends Model {
	id!: string;
	name!: string;
	email!: string;
	password?: string;
	poin?: number;
	province_id?: number;
	regency_id?: number;
	district_id?: number;

	static tableName = tableNames.user;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({});
}
