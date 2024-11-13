import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from './entities/post.entity.js';
import { CreatePostParams } from './types/create-post.type.js';
import { PostWithRating } from './types/post-with-rating.type.js';

import { RatingService } from '../rating/rating.service.js';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
    private ratingService: RatingService,
  ) {}

  getAllAvailablePosts(): Promise<PostEntity[]> {
    return this.postRepository.find({ relations: { author: true } }); // TODO search only for active posts
  }

  createPost(data: CreatePostParams): Promise<PostEntity> {
    return this.postRepository.save(data);
  }

  async getPostByIdOrFail(postId: number): Promise<PostWithRating> {
    const post = await this.postRepository.findOneOrFail({
      where: { id: postId },
      relations: { author: true, comments: { author: true } },
    });

    const rating = await this.ratingService.getRatingByPostId(postId);

    return {
      ...post,
      ...rating,
    } as PostWithRating;
  }

  async updatePostById(
    postId: number,
    data: Partial<PostEntity>,
  ): Promise<PostEntity> {
    await this.postRepository.update(postId, data);

    return this.getPostByIdOrFail(postId);
  }
}
