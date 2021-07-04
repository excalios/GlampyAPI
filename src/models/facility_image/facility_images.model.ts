import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import ProductCustomFacility from '../product_custom_facility/product_custom_facilities.model';

import jsonSchema from './facility_images.schema.json';

export default class FacilityImage extends Model {
	id!: string;
	custom_facility_id!: string;
	title!: string;
	description?: string;
	image!: string;

	static tableName = tableNames.facility_image;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		facility: {
			relation: Model.BelongsToOneRelation,
			modelClass: ProductCustomFacility,
			join: {
				from: `${tableNames.facility_image}.custom_facility_id`,
				to: `${tableNames.product_custom_facility}.id`,
			},
		},
	});
}
