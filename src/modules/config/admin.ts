import { envConfig } from './schema.js';

export const adminConfig = {
  email: envConfig.ADMIN_EMAIL,
  password: envConfig.ADMIN_PASSWORD,
};
