import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from './entities/comment.entity.js';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentRepository: Repository<CommentEntity>,
  ) {}

  getCommentsByPostId(postId: number): Promise<CommentEntity[]> {
    return this.commentRepository.find({
      where: { postId },
      relations: { author: true },
    });
  }

  createComment(
    data: Pick<CommentEntity, 'body' | 'authorId' | 'postId'>,
  ): Promise<CommentEntity> {
    return this.commentRepository.save(data);
  }

  async updateCommentById(
    id: number,
    data: Pick<CommentEntity, 'body' | 'status'>,
  ): Promise<CommentEntity> {
    await this.commentRepository.update(id, data);

    return this.commentRepository.findOneOrFail({
      where: { id },
      relations: { author: true },
    });
  }
}
