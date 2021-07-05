import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import ProductVariation from '../product_variation/product_variations.model';
import Product from '../product/products.model';
import User from '../user/users.model';

import jsonSchema from './product_orders.schema.json';

export default class ProductOrder extends Model {
	id!: string;
	user_id!: string;
	product_id!: string;
	variation_id!: string;
	date_start!: string;
	date_end!: string;
	guest_number!: number;

	static tableName = tableNames.product_order;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		user: {
			relation: Model.BelongsToOneRelation,
			modelClass: User,
			join: {
				from: `${tableNames.product_order}.user_id`,
				to: `${tableNames.user}.id`,
			},
		},
		product: {
			relation: Model.BelongsToOneRelation,
			modelClass: Product,
			join: {
				from: `${tableNames.product_order}.product_id`,
				to: `${tableNames.product}.id`,
			},
		},
		variation: {
			relation: Model.BelongsToOneRelation,
			modelClass: ProductVariation,
			join: {
				from: `${tableNames.product_order}.variation_id`,
				to: `${tableNames.product_variation}.id`,
			},
		},
	});
}
