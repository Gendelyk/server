import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './entities/post.entity.js';
import { CreatePostParams } from './types/create-post.type.js';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  getAllAvailablePosts(): Promise<PostEntity[]> {
    return this.postRepository.find({ relations: { author: true } }); // TODO search only for active posts
  }

  createPost(data: CreatePostParams): Promise<PostEntity> {
    return this.postRepository.save(data);
  }

  getPostByIdOrFail(postId: number): Promise<PostEntity> {
    return this.postRepository.findOneOrFail({
      where: { id: postId },
      relations: { author: true },
    });
  }

  async updatePostById(
    postId: number,
    data: Partial<PostEntity>,
  ): Promise<PostEntity> {
    await this.postRepository.update(postId, data);

    return this.getPostByIdOrFail(postId);
  }
}
