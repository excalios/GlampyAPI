import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import FacilityImage from '../facility_image/facility_images.model';
import Product from '../product/products.model';
import ProductVariation from '../product_variation/product_variations.model';

import jsonSchema from './product_custom_facilities.schema.json';

export default class ProductCustomFacility extends Model {
	id!: string;
	product_id!: string;
	name!: string;

	static tableName = tableNames.product_custom_facility;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		product: {
			relation: Model.BelongsToOneRelation,
			modelClass: Product,
			join: {
				from: `${tableNames.product_custom_facility}.product_id`,
				to: `${tableNames.product}.id`,
			},
		},
		variation: {
			relation: Model.BelongsToOneRelation,
			modelClass: ProductVariation,
			join: {
				from: `${tableNames.product_custom_facility}.product_id`,
				to: `${tableNames.product_variation}.id`,
			},
		},
		images: {
			relation: Model.HasManyRelation,
			modelClass: FacilityImage,
			join: {
				from: `${tableNames.product_custom_facility}.id`,
				to: `${tableNames.facility_image}.product_custom_facility_id`,
			},
		},
	});
}
