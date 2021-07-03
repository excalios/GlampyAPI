import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(tableNames.regency, (table) => {
		table.uuid('id').primary().unique().index().notNullable();
		table
			.uuid(`${tableNames.province}_id`)
			.references('id')
			.inTable(tableNames.province)
			.notNullable()
			.onDelete('cascade');
		table.string('name').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.regency);
}
