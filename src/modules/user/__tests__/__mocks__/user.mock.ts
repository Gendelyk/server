import { UserEntity } from '../../../../modules/user/entities/user.entity.js';
import { UserRole } from '../../enums/user-role.enum.js';

export const createMockUser = (): UserEntity => {
  const user = {
    email: Math.random().toString(36),
    password: Math.random().toString(36),
    firstName: Math.random().toString(36),
    lastName: Math.random().toString(36),
    role: UserRole.Admin,
  } as UserEntity;

  return user;
};
