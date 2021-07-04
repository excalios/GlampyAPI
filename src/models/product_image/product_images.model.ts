import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './product_images.schema.json';

export default class ProductImage extends Model {
	id!: string;
	product_id!: string;
	title!: string;
	description?: string;
	is_variation?: boolean;

	static tableName = tableNames.product_image;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({});
}
