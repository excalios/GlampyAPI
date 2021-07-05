import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './review.schema.json';
import Product from '../product/products.model';
import User from '../user/users.model';
import ReviewImage from '../review_image/review_images.model';

export default class Review extends Model {
	id!: string;
	user_id!: string;
	product_id!: string;
	review!: string;
	score?: number;

	static tableName = tableNames.review;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		user: {
			relation: Model.BelongsToOneRelation,
			modelClass: User,
			join: {
				from: `${tableNames.review}.user_id`,
				to: `${tableNames.user}.id`,
			},
		},
		product: {
			relation: Model.BelongsToOneRelation,
			modelClass: Product,
			join: {
				from: `${tableNames.review}.product_id`,
				to: `${tableNames.product}.id`,
			},
		},
		images: {
			relation: Model.HasManyRelation,
			modelClass: ReviewImage,
			join: {
				from: `${tableNames.review}.id`,
				to: `${tableNames.review_image}.review_id`,
			},
		},
	});
}
