import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './product_facilities.schema.json';

export default class ProductFacility extends Model {
	id!: string;
	name!: string;
	icon!: string;

	static tableName = tableNames.facility;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({});
}
