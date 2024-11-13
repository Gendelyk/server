import { PickType } from '@nestjs/swagger';

import { CommentDto } from './comment.dto.js';

export class CreatedCommentDto extends PickType(CommentDto, [
  'id',
  'body',
  'status',
]) {}
