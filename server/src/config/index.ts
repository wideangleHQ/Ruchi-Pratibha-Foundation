import appConfig from './app.config';
import databaseConfig from './database.config';
import authConfig from './auth.config';
import cacheConfig from './cache.config';
import storageConfig from './storage.config';
import securityConfig from './security.config';
import swaggerConfig from './swagger.config';
import mailConfig from './mail.config';
import supabaseConfig from './supabase.config';
import dashboardAuthConfig from './dashboard-auth.config';

export const configurations = [
  appConfig,
  databaseConfig,
  authConfig,
  cacheConfig,
  storageConfig,
  securityConfig,
  swaggerConfig,
  mailConfig,
  supabaseConfig,
  dashboardAuthConfig,
];

export {
  appConfig,
  databaseConfig,
  authConfig,
  cacheConfig,
  storageConfig,
  securityConfig,
  swaggerConfig,
  mailConfig,
  supabaseConfig,
  dashboardAuthConfig,
};
