import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import Product from '../product/products.model';
import ProductVariation from '../product_variation/product_variations.model';

import jsonSchema from './facilities.schema.json';

export default class Facility extends Model {
	id!: string;
	name!: string;
	icon!: string;

	static tableName = tableNames.facility;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		product: {
			relation: Model.BelongsToOneRelation,
			modelClass: Product,
			join: {
				from: `${tableNames.facility}.id`,
				through: {
					from: `${tableNames.product_facility}.facility_id`,
					to: `${tableNames.product_facility}.product_id`,
				},
				to: `${tableNames.product}.id`,
			},
		},
		variation: {
			relation: Model.BelongsToOneRelation,
			modelClass: ProductVariation,
			join: {
				from: `${tableNames.facility}.id`,
				through: {
					from: `${tableNames.product_facility}.facility_id`,
					to: `${tableNames.product_facility}.product_id`,
				},
				to: `${tableNames.product_variation}.id`,
			},
		},
	});
}
