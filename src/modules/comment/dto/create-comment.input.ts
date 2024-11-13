import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

import { CommentDto } from './comment.dto.js';

export class CreateCommentInput extends PickType(CommentDto, ['body']) {
  @ApiProperty()
  @IsNumber()
  postId: number;
}
