import tableNames from '@src/constants/tableNames';
import { Model } from 'objection';
import Product from '../product/products.model';
import Facility from '../facility/facilities.model';

import jsonSchema from './product_facilities.schema.json';

export default class ProductFacility extends Model {
	id!: string;
	product_id!: string;
	facility_id!: string;

	static tableName = tableNames.product_facility;
	static jsonSchema = jsonSchema;

	static relationMappings = () => ({
		product: {
			relation: Model.BelongsToOneRelation,
			modelClass: Product,
			join: {
				from: `${tableNames.product_facility}.product_id`,
				to: `${tableNames.product}.id`,
			},
		},
		facility: {
			relation: Model.BelongsToOneRelation,
			modelClass: Facility,
			join: {
				from: `${tableNames.product_facility}.facility_id`,
				to: `${tableNames.facility}.id`,
			},
		},
	});
}
