import { ApiProperty } from '@nestjs/swagger';

import { PostDto } from './post.dto.js';

import { CommentDto } from '../../comment/dto/comment.dto.js';

export class PostWithCommentsAndRatingDto extends PostDto {
  @ApiProperty({ type: CommentDto })
  comments: CommentDto[];

  @ApiProperty()
  upvoteCount: number;

  @ApiProperty()
  downvoteCount: number;
}
