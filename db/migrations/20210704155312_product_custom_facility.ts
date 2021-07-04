import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(
		tableNames.product_custom_facility,
		(table) => {
			table
				.uuid('id')
				.primary()
				.index()
				.unique()
				.notNullable()
				.defaultTo(uuidv4());
			table.uuid(`${tableNames.product}_id`).notNullable();
			table.string('name').notNullable();
		}
	);
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.product_custom_facility);
}
