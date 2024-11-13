import { PickType } from '@nestjs/swagger';

import { BaseUser } from '../../../common/dto/base-user.js';

export class RegisterUserInput extends PickType(BaseUser, [
  'firstName',
  'lastName',
  'email',
  'password',
]) {}
