import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';
import { v4 as uuidv4 } from 'uuid';

export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable(tableNames.product, (table) => {
		table
			.uuid('id')
			.primary()
			.index()
			.unique()
			.notNullable()
			.defaultTo(uuidv4());
		table.string('title').notNullable();
		table.text('description').notNullable();
		table.integer('price').notNullable();
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
		table.string('address', 255).notNullable();
		table.integer('min_occupation').unsigned().notNullable();
		table.integer('max_occupation').unsigned().notNullable();
		table.integer('available_product').unsigned().notNullable();
	});
}

export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTable(tableNames.product);
}
