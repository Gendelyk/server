import { InferType, number, object, string } from 'yup';

export enum NodeEnv {
  Production = 'production',
  Staging = 'staging',
  Development = 'development',
  Local = 'local',
  Test = 'test',
}

const envConfigSchema = object({
  NODE_ENV: string().oneOf(Object.values(NodeEnv)),
  PORT: number().default(3000),

  ACCESS_TOKEN_SECRET: string().required(),

  DATABASE_URL: string().required(),

  ADMIN_EMAIL: string(),
  ADMIN_PASSWORD: string(),
});

// parse and assert validity
export const envConfig = envConfigSchema.validateSync(process.env);

export type Config = InferType<typeof envConfigSchema>;
