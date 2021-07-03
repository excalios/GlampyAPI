import * as Knex from 'knex';

import tableNames from '../../src/constants/tableNames';

import provinces from './Zones/provinces';
import regencies from './Zones/regencies';
import districts from './Zones/districts';

export async function seed(knex: Knex): Promise<void> {
	// https://raw.githubusercontent.com/mddarmawan/Wilayah-Administratif-Indonesia/master/mysql/indonesia.sql

	// Insert province data
	await knex(tableNames.province).del();

	await knex(tableNames.province).insert(provinces);

	await knex(tableNames.regency).del();

	await knex.batchInsert(tableNames.regency, regencies, 500);

	await knex(tableNames.district).del();

	await knex.batchInsert(tableNames.district, districts, 500);
}
