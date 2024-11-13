import { PickType } from '@nestjs/swagger';

import { CommentDto } from './comment.dto.js';

export class EditCommentInput extends PickType(CommentDto, [
  'body',
  'status',
]) {}
