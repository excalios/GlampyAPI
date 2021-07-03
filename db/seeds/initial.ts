import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
	// Deletes ALL existing entries
	await knex(tableNames.admin).del();

	// Inserts seed entries
	await knex(tableNames.admin).insert([
		{
			id: uuidv4(),
			email: 'admin@test.com',
			name: 'admin',
			password: await bcrypt.hash('test123.', 12),
		},
	]);
}
