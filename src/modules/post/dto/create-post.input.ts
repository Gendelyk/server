import { PickType } from '@nestjs/swagger';

import { PostDto } from './post.dto.js';

export class CreatePostInput extends PickType(PostDto, [
  'title',
  'body',
  'categoryId',
]) {}
