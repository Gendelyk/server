import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './controllers/user.controller.js';
import { UserAdminController } from './controllers/user-admin.controller.js';
import { UserEntity } from './entities/user.entity.js';
import { UserService } from './user.service.js';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  exports: [UserService],
  controllers: [UserController, UserAdminController],
})
export class UserModule {}
