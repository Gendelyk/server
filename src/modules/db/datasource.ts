import { DataSource, DataSourceOptions } from 'typeorm';

import { entities } from './entities.js';

import { appConfig } from '../config/app.js';
import { NodeEnv } from '../config/schema.js';

export const dataSourceConfig: DataSourceOptions = {
  type: 'postgres',
  url: appConfig.databaseUrl,
  synchronize: true,
  entities,
  migrationsRun: true,
  migrationsTableName: 'migrations',
  migrationsTransactionMode: 'all',
  ssl:
    appConfig.nodeEnv === NodeEnv.Local || appConfig.nodeEnv === NodeEnv.Test
      ? false
      : {
          rejectUnauthorized: false,
        },
};

export const dataSource = new DataSource(dataSourceConfig);
