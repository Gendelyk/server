import { DataSource } from 'typeorm';

import { adminConfig } from '../../src/modules/config/admin.js';
import { CryptoService } from '../../src/modules/crypto/crypto.service.js';
import { UserEntity } from '../../src/modules/user/entities/user.entity.js';
import { UserRole } from '../../src/modules/user/enums/user-role.enum.js';
import { UserService } from '../../src/modules/user/user.service.js';

export const createAdmin = async (dataSource: DataSource): Promise<void> => {
  try {
    console.debug('Creating admin...');

    const userService = new UserService(
      dataSource.getRepository(UserEntity),
      new CryptoService(),
    );

    if (!adminConfig.email || !adminConfig.password) {
      throw new Error('No password or email');
    }

    await userService.createUser({
      email: adminConfig.email,
      password: adminConfig.password,
      firstName: adminConfig.email,
      lastName: adminConfig.email,
      role: UserRole.Admin,
    });

    console.debug('Admin has been created successfully!');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
