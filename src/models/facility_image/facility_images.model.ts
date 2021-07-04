import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';

import jsonSchema from './facility_images.schema.json';

export default class FacilityImage extends Model {
	id!: string;
	custom_facility_id!: string;
	title!: string;
	description?: string;

	static tableName = tableNames.facility_image;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({});
}
