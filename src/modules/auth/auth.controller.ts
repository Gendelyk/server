import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Logger,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { AuthService } from './auth.service.js';
import { ONE_YEAR_IN_MS } from './constants.js';
import { LoginInput } from './dto/login/input.dto.js';
import { LoginOutput } from './dto/login/output.dto.js';
import { RegisterUserInput } from './dto/register/input.dto.js';
import { UserGuard } from './guards/user.guard.js';

import { ErrorOutput } from '../common/dto/error.output.js';
import { SuccessOutput } from '../common/dto/sucess.output.js';
import { UserRole } from '../user/enums/user-role.enum.js';
import { UserService } from '../user/user.service.js';

@ApiTags('Auth')
@Controller('/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    description: 'User logged in successfully',
    type: LoginOutput,
  })
  @ApiNotFoundResponse({
    description: 'User is not found',
    type: ErrorOutput,
  })
  @Post('/login')
  async login(
    @Body() loginDto: LoginInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginOutput | ErrorOutput> {
    try {
      const { accessToken } = await this.authService.login(loginDto);

      this.attachAccessToken(res, accessToken);

      return { accessToken };
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND);
      this.logger.error('Error while authenticating', error);

      return {
        errors: {
          root: 'User not found',
        },
      };
    }
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('/register')
  @ApiOkResponse({
    description: 'User is created successfully',
    type: LoginOutput,
  })
  @ApiNotFoundResponse({
    description: 'User already exists',
    type: ErrorOutput,
  })
  async register(
    @Body() dto: RegisterUserInput,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LoginOutput | ErrorOutput> {
    try {
      // * to prevent registering user admin other way than from admin panel
      const { accessToken } = await this.authService.register({
        ...dto,
        role: UserRole.User,
      });

      this.attachAccessToken(res, accessToken);

      return { accessToken };
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND);

      return { errors: { root: 'User already exists' } };
    }
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @ApiOkResponse({
    description: 'User is logged out successfully',
    type: SuccessOutput,
  })
  logout(
    @Res({ passthrough: true }) res: Response,
    // @UserIdentity() user: User,
  ): SuccessOutput {
    res.cookie('accessToken', '');

    // await this.userService.updateUserById({
    //   id: user.id,
    //   data: {},
    // });

    return { message: 'Logged out successfully' };
  }

  private attachAccessToken(response: Response, accessToken: string): void {
    response.cookie('accessToken', accessToken, {
      expires: new Date(Date.now() + ONE_YEAR_IN_MS),
    });
  }
}
