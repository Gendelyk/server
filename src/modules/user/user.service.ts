import { ConflictException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entities/user.entity.js';
import { CreateUserParams } from './types/create-user.js';
import { EditUserParams } from './types/edit-user.js';

import { BadRequestException } from '../common/exceptions/bad-request.exception.js';
import { CryptoService } from '../crypto/crypto.service.js';

export class UserService {
  private logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private cryptoService: CryptoService,
  ) {}

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne({
      where: { email },
    });

    return user;
  }

  async getUserByIdOrFail(userId: number): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({
      where: { id: userId },
    });
  }

  async updateUserById(params: EditUserParams): Promise<UserEntity> {
    this.logger.debug('Updating user data...');
    const { data, id } = params;

    const userData: Partial<UserEntity> = data;

    if (data.oldPassword && data.newPassword) {
      this.logger.debug('Verifying old password...');
      await this.verifyOldPassword(id, data.oldPassword);

      this.logger.debug('Hashing new password...');
      userData.password = await this.cryptoService.hashPassword(
        data.newPassword,
      );

      // * clean values as typeorm will throw error about unknown fields
      delete data.oldPassword;
      delete data.newPassword;
    }

    await this.userRepository.update(id, userData);

    return this.getUserByIdOrFail(id);
  }

  async createUser(data: CreateUserParams): Promise<UserEntity> {
    const existingUser = await this.userRepository.findOne({
      where: [{ email: data.email }],
    });

    if (existingUser) {
      throw new ConflictException(
        'User with such email or phone number already exists!',
      );
    }

    const hashedPassword = await this.cryptoService.hashPassword(data.password);

    const newUser = await this.userRepository.save({
      ...data,
      password: hashedPassword,
    });

    return newUser;
  }

  async getUserByEmailOrFail(email: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({
      where: { email },
    });
  }

  async updateUserByEmail(
    email: string,
    data: Partial<UserEntity>,
  ): Promise<UserEntity> {
    await this.userRepository.update({ email }, data);

    const user = await this.getUserByEmailOrFail(email);

    return user;
  }

  private async verifyOldPassword(
    userId: number,
    password: string,
  ): Promise<void> {
    const { password: userOldPassword } = await this.getUserByIdOrFail(userId);

    const isValidPassword = await this.cryptoService.verifyPassword(
      password,
      userOldPassword,
    );

    if (!isValidPassword) {
      throw new BadRequestException({
        field: 'oldPassword',
        message: 'Old password does not match',
      });
    }
  }
}
