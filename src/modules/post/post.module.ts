import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostEntity } from './entities/post.entity.js';
import { PostController } from './post.controller.js';
import { PostService } from './post.service.js';

import { CommentModule } from '../comment/comment.module.js';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), CommentModule],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
