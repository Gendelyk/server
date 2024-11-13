import { CreatedCommentDto } from '../dto/created-comment.dto.js';
import { CommentEntity } from '../entities/comment.entity.js';

export class CreatedCommentAdapter {
  static toDto(entity: CommentEntity): CreatedCommentDto {
    return {
      body: entity.body,
      id: entity.id,
      status: entity.status,
    };
  }
}
