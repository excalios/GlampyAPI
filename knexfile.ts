// Update with your config settings.

interface ConfigObject {
	[index: string]: object;
}

require('dotenv').config();

const config: ConfigObject = {
	development: {
		debug: true,
		client: 'pg',
		connection: {
			database: process.env.DB_DATABASE,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},

	test: {
		//debug: true,
		client: 'pg',
		connection: {
			database: process.env.DB_DATABASE,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},

	production: {
		client: 'pg',
		connection: {
			database: process.env.DB_DATABASE,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
		},
		migrations: {
			directory: './db/migrations',
		},
		seeds: {
			directory: './db/seeds',
		},
	},
};

export default config;
