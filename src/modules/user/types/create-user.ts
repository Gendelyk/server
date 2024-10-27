import { UserEntity } from '../entities/user.entity.js';

export type CreateUserParams = Pick<
  UserEntity,
  'email' | 'password' | 'firstName' | 'lastName'
> &
  Partial<Pick<UserEntity, 'createdAt' | 'role'>>;
