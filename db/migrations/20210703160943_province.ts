import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(tableNames.province, (table) => {
		table.uuid('id').primary().unique().index().notNullable();
		table.string('name').notNullable().unique();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.province);
}
