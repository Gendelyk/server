import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { BaseUser } from '../../../common/dto/base-user.js';
import { UserRole } from '../../enums/user-role.enum.js';

export class CreateUserInput extends OmitType(BaseUser, ['id']) {
  @ApiProperty({ enum: UserRole })
  @IsEnum(UserRole)
  role: UserRole;
}
