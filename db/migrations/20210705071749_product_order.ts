import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(tableNames.product_order, (table) => {
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
		table
			.uuid(`variation_id`)
			.references('id')
			.inTable(tableNames.product_variation)
			.onDelete('cascade');
		table.date('date_start').notNullable();
		table.date('date_end').notNullable();
		table.integer('guest_number').unsigned().notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.product_order);
}
