import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './product_variations.schema.json';

export default class ProductVariation extends Model {
	id!: string;
	product_id!: string;
	title!: string;
	description?: string;
	price?: number;
	min_occupation?: number;
	max_occupation?: number;
	available_product?: number;

	static tableName = tableNames.product_variation;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({});
}
