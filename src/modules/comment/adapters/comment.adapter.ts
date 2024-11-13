import { UserAdapter } from '../../user/adapters/user.adapter.js';
import { CommentDto } from '../dto/comment.dto.js';
import { CommentEntity } from '../entities/comment.entity.js';

export class CommentAdapter {
  static toDto(entity: CommentEntity): CommentDto {
    return {
      author: UserAdapter.toDto(entity.author),
      body: entity.body,
      id: entity.id,
      status: entity.status,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
    };
  }
}
