import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './product_custom_facilities.schema.json';

export default class ProductCustomFacility extends Model {
	id!: string;
	product_id!: string;
	name!: string;

	static tableName = tableNames.product_custom_facility;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({});
}
