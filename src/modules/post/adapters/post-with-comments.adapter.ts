import { PostAdapter } from './post.adapter.js';

import { CommentAdapter } from '../../comment/adapters/comment.adapter.js';
import { PostWithCommentsDto } from '../dto/post-with-comments.dto.js';
import { PostEntity } from '../entities/post.entity.js';

export class PostWithCommentsAdapter {
  static toDto(entity: PostEntity): PostWithCommentsDto {
    return {
      ...PostAdapter.toDto(entity),
      comments: entity.comments.map(CommentAdapter.toDto),
    };
  }
}
