import knex from 'knex';
import { Model } from 'objection';

import knexConfig from '../knexfile';

const environment: string = process.env.NODE_ENV || 'development';
const connectionConfig: object = knexConfig[environment];

const connection: knex = knex(connectionConfig);

Model.knex(connection);

export default connection;
