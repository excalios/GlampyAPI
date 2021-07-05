import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import ProductVariation from '../product_variation/product_variations.model';
import ProductImage from '../product_image/product_images.model';
import ProductFacility from '../product_facility/product_facilities.model';
import ProductCustomFacility from '../product_custom_facility/product_custom_facilities.model';

import jsonSchema from './products.schema.json';
import Province from '../province/provinces.model';
import Regency from '../regency/regencies.model';
import District from '../district/districts.model';
import Facility from '../facility/facilities.model';
import Review from '../review/review.model';

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
		province: {
			relation: Model.BelongsToOneRelation,
			modelClass: Province,
			join: {
				from: `${tableNames.product}.province_id`,
				to: `${tableNames.province}.id`,
			},
		},
		regency: {
			relation: Model.BelongsToOneRelation,
			modelClass: Regency,
			join: {
				from: `${tableNames.product}.regency_id`,
				to: `${tableNames.regency}.id`,
			},
		},
		district: {
			relation: Model.BelongsToOneRelation,
			modelClass: District,
			join: {
				from: `${tableNames.product}.district_id`,
				to: `${tableNames.district}.id`,
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
		facilities: {
			relation: Model.ManyToManyRelation,
			modelClass: Facility,
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
		reviews: {
			relation: Model.HasManyRelation,
			modelClass: Review,
			join: {
				from: `${tableNames.product}.id`,
				to: `${tableNames.review}.product_id`,
			},
		},
	});
}
