import { config } from 'dotenv';
config();

export const {
  // WebServer creds
  URL,
  PORT,
  // DB creds
  DB_DIALECT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  // JWT creds
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
  ACCESS_TOKEN_ALIVE_PERIOD,
  REFRESH_TOKEN_ALIVE_PERIOD,
} = process.env as Record<string, string>;
