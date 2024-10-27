import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import { IsPassword } from '../../user/decorators/is-password.decorator.js';

export class BaseUser {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsEmail({}, { message: 'Must be valid email' })
  email: string;

  @IsPassword()
  password: string;

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
}
