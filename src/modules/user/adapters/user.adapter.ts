import { UserDto } from '../dto/user.dto.js';
import { UserEntity } from '../entities/user.entity.js';

export class UserAdapter {
  static toDto(entity: UserEntity): UserDto {
    return {
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      role: entity.role,
    };
  }
}
