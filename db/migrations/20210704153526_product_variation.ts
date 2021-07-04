import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(tableNames.product_variation, (table) => {
		table
			.uuid('id')
			.primary()
			.index()
			.unique()
			.notNullable()
			.defaultTo(knex.raw('gen_random_uuid()'));
		table
			.uuid(`${tableNames.product}_id`)
			.references('id')
			.inTable(tableNames.product)
			.notNullable()
			.onDelete('cascade');
		table.string('title').notNullable();
		table.text('description').notNullable();
		table.integer('price').notNullable();
		table.integer('min_occupation').unsigned().notNullable();
		table.integer('max_occupation').unsigned().notNullable();
		table.integer('available_product').unsigned().notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.product_variation);
}
