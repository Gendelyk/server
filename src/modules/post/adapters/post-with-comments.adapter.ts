import { PostAdapter } from './post.adapter.js';

import { CommentAdapter } from '../../comment/adapters/comment.adapter.js';
import { PostWithCommentsAndRatingDto } from '../dto/post-with-comments.dto.js';
import { PostEntity } from '../entities/post.entity.js';
import { WithRating } from '../types/with-rating.type.js';

export class PostWithCommentsAdapter {
  static toDto(entity: PostEntity & WithRating): PostWithCommentsAndRatingDto {
    const { upvoteCount, downvoteCount } = entity;

    return {
      ...PostAdapter.toDto(entity),
      upvoteCount,
      downvoteCount,
      comments: entity.comments.map(CommentAdapter.toDto),
    };
  }
}
