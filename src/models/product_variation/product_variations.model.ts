import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import Product from '../product/products.model';
import ProductImage from '../product_image/product_images.model';
import ProductFacility from '../product_facility/product_facilities.model';
import ProductCustomFacility from '../product_custom_facility/product_custom_facilities.model';

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

	static relationMappings = () => ({
		product: {
			relation: Model.BelongsToOneRelation,
			modelClass: Product,
			join: {
				from: `${tableNames.product_variation}.product_id`,
				to: `${tableNames.product}.id`,
			},
		},
		images: {
			relation: Model.HasManyRelation,
			modelClass: ProductImage,
			join: {
				from: `${tableNames.product_variation}.id`,
				to: `${tableNames.product_image}.product_id`,
			},
		},
		facilites: {
			relation: Model.ManyToManyRelation,
			modelClass: ProductFacility,
			join: {
				from: `${tableNames.product_variation}.id`,
				through: {
					from: `${tableNames.product_facility}.product_id`,
					to: `${tableNames.product_facility}.facility_id`,
				},
				to: `${tableNames.facility}.id`,
			},
		},
		custom_facilities: {
			relation: Model.HasManyRelation,
			modelClass: ProductCustomFacility,
			join: {
				from: `${tableNames.product_variation}.id`,
				to: `${tableNames.product_custom_facility}.product_id`,
			},
		},
	});
}
