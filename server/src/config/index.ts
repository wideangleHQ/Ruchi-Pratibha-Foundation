import appConfig from './app.config';
import databaseConfig from './database.config';
import authConfig from './auth.config';
import cacheConfig from './cache.config';
import storageConfig from './storage.config';
import securityConfig from './security.config';
import swaggerConfig from './swagger.config';
import mailConfig from './mail.config';

export const configurations = [
  appConfig,
  databaseConfig,
  authConfig,
  cacheConfig,
  storageConfig,
  securityConfig,
  swaggerConfig,
  mailConfig,
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
};
