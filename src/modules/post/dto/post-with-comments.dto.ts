import { ApiProperty } from '@nestjs/swagger';

import { PostDto } from './post.dto.js';

import { CommentDto } from '../../comment/dto/comment.dto.js';

export class PostWithCommentsDto extends PostDto {
  @ApiProperty({ type: CommentDto })
  comments: CommentDto[];
}
