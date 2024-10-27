import { createAdmin } from './create-admin.js';

import { dataSource } from '../../src/modules/db/datasource.js';

const runSeed = async (): Promise<void> => {
  try {
    console.debug('Connecting to the database...');

    await dataSource.initialize();

    console.debug('Connected! Running seeds...');

    await createAdmin(dataSource);

    await dataSource.destroy();

    console.debug('Seeds have been run successfully!');
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

void runSeed();
