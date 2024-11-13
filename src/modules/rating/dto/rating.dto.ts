import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';

import { RatingEnum } from '../enum/rating.enum.js';

export class RatingDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNumber()
  postId: number;

  @ApiProperty({ enum: RatingEnum })
  @IsEnum(RatingEnum)
  rating: RatingEnum;
}
