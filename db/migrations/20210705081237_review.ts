import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(tableNames.review, (table) => {
		table
			.uuid('id')
			.primary()
			.index()
			.unique()
			.notNullable()
			.defaultTo(knex.raw('gen_random_uuid()'));
		table
			.uuid(`${tableNames.user}_id`)
			.references('id')
			.inTable(tableNames.user)
			.notNullable()
			.onDelete('cascade');
		table
			.uuid(`${tableNames.product}_id`)
			.references('id')
			.inTable(tableNames.product)
			.notNullable()
			.onDelete('cascade');
		table.text('review').notNullable();
		table.integer('score').unsigned().notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.review);
}
