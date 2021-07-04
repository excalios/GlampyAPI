import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(tableNames.user, (table) => {
		table
			.uuid('id')
			.primary()
			.index()
			.unique()
			.notNullable()
			.defaultTo(knex.raw('gen_random_uuid()'));
		table.string('name').notNullable();
		table.string('email').notNullable();
		table.string('password').notNullable();
		table.integer('poin').notNullable().defaultTo(0);
		table
			.uuid(`${tableNames.province}_id`)
			.references('id')
			.inTable(tableNames.province)
			.notNullable()
			.onDelete('cascade');
		table
			.uuid(`${tableNames.regency}_id`)
			.references('id')
			.inTable(tableNames.regency)
			.notNullable()
			.onDelete('cascade');
		table
			.uuid(`${tableNames.district}_id`)
			.references('id')
			.inTable(tableNames.district)
			.notNullable()
			.onDelete('cascade');
		table.string('vaccine_certificate').nullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.user);
}
