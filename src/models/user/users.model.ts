import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

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

	static relationMappings = () => ({});
}
