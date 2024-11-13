import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ScheduleModule } from '@nestjs/schedule';
import { SentryModule } from '@sentry/nestjs/setup';

import { AppController } from './app.controller.js';
import { AuthModule } from './modules/auth/auth.module.js';
import { CategoryModule } from './modules/category/category.module.js';
import { CommentModule } from './modules/comment/comment.module.js';
import { CryptoModule } from './modules/crypto/crypto.module.js';
import { DbModule } from './modules/db/db.module.js';
import { PostModule } from './modules/post/post.module.js';
import { UserModule } from './modules/user/user.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      cache: true,
    }),
    SentryModule.forRoot(),
    DbModule,
    AuthModule,
    UserModule,
    CryptoModule,
    ScheduleModule.forRoot(),
    EventEmitterModule.forRoot(),
    PostModule,
    CategoryModule,
    CommentModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
