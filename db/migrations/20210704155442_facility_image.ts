import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(tableNames.facility_image, (table) => {
		table
			.uuid('id')
			.primary()
			.index()
			.unique()
			.notNullable()
			.defaultTo(knex.raw('gen_random_uuid()'));
		table
			.uuid(`custom_facility_id`)
			.notNullable()
			.references('id')
			.inTable(tableNames.product_custom_facility)
			.onDelete('cascade');
		table.string('title').notNullable();
		table.text('description').notNullable();
		table.string('image').notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.facility_image);
}
