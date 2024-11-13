import { PartialType, PickType } from '@nestjs/swagger';

import { PostDto } from './post.dto.js';

export class EditPostInput extends PartialType(
  PickType(PostDto, ['title', 'body', 'status']),
) {}
