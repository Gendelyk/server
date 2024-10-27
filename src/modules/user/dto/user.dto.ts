import { ApiProperty, PickType } from '@nestjs/swagger';

import { BaseUser } from '../../common/dto/base-user.js';
import { UserRole } from '../enums/user-role.enum.js';

export class UserDto extends PickType(BaseUser, [
  'id',
  'email',
  'firstName',
  'lastName',
]) {
  @ApiProperty({ enum: UserRole })
  role: UserRole;
}
