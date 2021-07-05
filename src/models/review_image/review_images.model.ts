import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import Review from '../review/review.model';

import jsonSchema from './review_images.schema.json';

export default class ReviewImage extends Model {
	id!: string;
	review_id!: string;
	image!: string;

	static tableName = tableNames.review_image;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		review: {
			relation: Model.BelongsToOneRelation,
			modelClass: Review,
			join: {
				from: `${tableNames.review_image}.review_id`,
				to: `${tableNames.review}.id`,
			},
		},
	});
}
