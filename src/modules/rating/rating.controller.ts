import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { RatingAdapter } from './adapter/rating.adapter.js';
import { CreateRatingInput } from './dto/crate-rating.input.js';
import { RatingDto } from './dto/rating.dto.js';
import { RatingService } from './rating.service.js';

import { UserGuard } from '../auth/guards/user.guard.js';
import { Identity } from '../auth/types/identity.js';
import { ErrorOutput } from '../common/dto/error.output.js';
import { UserIdentity } from '../user/decorators/user-identity.decorator.js';

@UseGuards(UserGuard)
@ApiTags('Rating')
@Controller('ratings')
export class RatingController {
  constructor(private ratingService: RatingService) {}

  @Get(':id')
  @ApiOkResponse({
    description: 'Get my rating for current post',
    type: RatingDto,
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async getMyRating(
    @Param('id', ParseIntPipe) postId: number,
    @UserIdentity() user: Identity,
  ): Promise<RatingDto | null> {
    const response = await this.ratingService.getUserRatingByPostId(
      user.id,
      postId,
    );

    return response && RatingAdapter.toDto(response);
  }

  @Post()
  @ApiOkResponse({
    description:
      'Create a rating. If rating existed before with the same value - just removes the rating. Otherwise sets rating to new value',
    type: RatingDto,
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async toggleRating(
    @Body() input: CreateRatingInput,
    @UserIdentity() user: Identity,
  ): Promise<RatingDto | null> {
    const rating = await this.ratingService.toggleRating({
      ...input,
      authorId: user.id,
    });

    return rating && RatingAdapter.toDto(rating);
  }
}
