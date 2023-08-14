import {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from '../../../config';
import { Sequelize } from 'sequelize';
// import { User } from './models/user.model';
// import { Token } from './models/token.model';

export const DB_CONNECTION = new Sequelize(
  `${DB_DIALECT}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`
);
