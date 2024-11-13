import { PickType } from '@nestjs/swagger';

import { RatingDto } from './rating.dto.js';

export class CreateRatingInput extends PickType(RatingDto, [
  'postId',
  'rating',
]) {}
