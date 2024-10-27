import { Length, Matches } from 'class-validator';
import { Column, Entity } from 'typeorm';

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
  PASSWORD_LENGTH_ERROR,
  PASSWORD_REGEX_ERROR,
  PASSWORD_VALIDATION_REGEX,
} from '../../auth/constants.js';
import { BaseEntity } from '../../common/entities/base-entity.entity.js';
import { UserRole } from '../enums/user-role.enum.js';

@Entity('user')
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {
    message: PASSWORD_LENGTH_ERROR,
  })
  @Matches(PASSWORD_VALIDATION_REGEX, {
    message: PASSWORD_REGEX_ERROR,
  })
  password: string;

  @Column({ type: 'varchar', length: 255 })
  firstName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.User,
  })
  role: UserRole;

  @Column({ type: 'varchar', length: 255 })
  lastName: string;
}
