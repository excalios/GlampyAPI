import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(tableNames.admin, (table) => {
		table
			.uuid('id')
			.primary()
			.index()
			.unique()
			.notNullable()
			.defaultTo(uuidv4());
		table.string('name').notNullable();
		table.string('email').notNullable();
		table.string('password').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.admin);
}
