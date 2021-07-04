import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import ProductVariation from '../product_variation/product_variations.model';
import ProductImage from '../product_image/product_images.model';
import ProductFacility from '../product_facility/product_facilities.model';
import ProductCustomFacility from '../product_custom_facility/product_custom_facilities.model';

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

	static relationMappings = () => ({
		variations: {
			relation: Model.HasManyRelation,
			modelClass: ProductVariation,
			join: {
				from: `${tableNames.product}.id`,
				to: `${tableNames.product_variation}.product_id`,
			},
		},
		images: {
			relation: Model.HasManyRelation,
			modelClass: ProductImage,
			join: {
				from: `${tableNames.product}.id`,
				to: `${tableNames.product_image}.product_id`,
			},
		},
		facilites: {
			relation: Model.ManyToManyRelation,
			modelClass: ProductFacility,
			join: {
				from: `${tableNames.product}.id`,
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
				from: `${tableNames.product}.id`,
				to: `${tableNames.product_custom_facility}.product_id`,
			},
		},
	});
}
