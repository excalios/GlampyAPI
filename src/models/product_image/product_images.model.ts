import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import Product from '../product/products.model';
import ProductVariation from '../product_variation/product_variations.model';

import jsonSchema from './product_images.schema.json';

export default class ProductImage extends Model {
	id!: string;
	product_id!: string;
	title!: string;
	description?: string;
	is_variation?: boolean;

	static tableName = tableNames.product_image;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		product: {
			relation: Model.BelongsToOneRelation,
			modelClass: Product,
			join: {
				from: `${tableNames.product_image}.product_id`,
				to: `${tableNames.product}.id`,
			},
		},
		variation: {
			relation: Model.BelongsToOneRelation,
			modelClass: ProductVariation,
			join: {
				from: `${tableNames.product_image}.product_id`,
				to: `${tableNames.product_variation}.id`,
			},
		},
	});
}
