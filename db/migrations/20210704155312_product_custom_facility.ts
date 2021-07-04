import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';

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
				.defaultTo(knex.raw('gen_random_uuid()'));
			table.uuid(`${tableNames.product}_id`).notNullable();
			table.string('name').notNullable();
		}
	);
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.product_custom_facility);
}
