import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './admins.schema.json';

export default class Admin extends Model {
	id!: string;
	name!: string;
	email!: string;
	password?: string;

	static tableName = tableNames.admin;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({});
}
