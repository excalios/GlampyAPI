import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './products.schema.json';

export default class Product extends Model {
	id!: string;
	title!: string;
	description?: string;
	price?: number;
	province_id?: string;
	regency_id?: string;
	district_id?: string;
	address?: string;
	min_occupation?: number;
	max_occupation?: number;
	available_product?: number;

	static tableName = tableNames.product;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({});
}
