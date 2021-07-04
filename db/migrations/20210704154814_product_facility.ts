import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(tableNames.product_facility, (table) => {
		table
			.uuid('id')
			.primary()
			.index()
			.unique()
			.notNullable()
			.defaultTo(knex.raw('gen_random_uuid()'));
		table.uuid(`${tableNames.product}_id`).notNullable();
		table
			.uuid(`${tableNames.facility}_id`)
			.references('id')
			.inTable(tableNames.facility)
			.notNullable()
			.onDelete('cascade');
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.product_facility);
}
