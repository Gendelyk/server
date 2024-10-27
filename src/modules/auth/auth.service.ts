import { Injectable, Logger } from '@nestjs/common';

import { LoginParams, LoginReturnType } from './types/login.js';
import { RegisterReturnType } from './types/register.js';

import { CryptoService } from '../crypto/crypto.service.js';
import { CreateUserParams } from '../user/types/create-user.js';
import { UserService } from '../user/user.service.js';

@Injectable()
export class AuthService {
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ) {}

  async login(params: LoginParams): Promise<LoginReturnType> {
    const { email, password } = params;

    this.logger.debug('email', email);
    const user = await this.userService.getUserByEmail(email);

    this.logger.debug('user', user);

    if (!user) {
      throw new Error('User not found');
    }

    const isValidPassword = await this.cryptoService.verifyPassword(
      password,
      user.password,
    );

    this.logger.debug('isValidPassword', isValidPassword);

    if (!isValidPassword) {
      throw new Error('User not found');
    }

    const accessToken = this.cryptoService.generateToken({
      ...user,
    });

    return { accessToken };
  }

  async register(params: CreateUserParams): Promise<RegisterReturnType> {
    const newUser = await this.userService.createUser(params);

    const accessToken = this.cryptoService.generateToken({
      ...newUser,
    });

    return { accessToken };
  }
}
