import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'),
});

export const env = {
  port: process.env.PORT || 3001,

  // Database
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    name: process.env.DB_NAME || 'calculationdb',
  },

  // Redis
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
    password: process.env.REDIS_PASSWORD || undefined,
  },

  // Keycloak
  keycloak: {
    serverUrl: process.env.KEYCLOAK_SERVER || 'http://localhost:8080',
    realm: process.env.KEYCLOAK_REALM || 'my-company-realm',
    clientId: process.env.KEYCLOAK_CLIENT_ID || 'backend-client',
    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || 'supersecret',
  },
};
