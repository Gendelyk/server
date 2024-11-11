import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from './entities/post.entity.js';
import { PostController } from './post.controller.js';
import { PostService } from './post.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
