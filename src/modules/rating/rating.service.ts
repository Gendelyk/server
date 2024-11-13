import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { RatingEntity } from './entities/rating.entity.js';
import { RatingEnum } from './enum/rating.enum.js';

import { WithRating } from '../post/types/with-rating.type.js';

@Injectable()
export class RatingService {
  private logger = new Logger(RatingService.name);

  constructor(
    @InjectRepository(RatingEntity)
    private ratingRepository: Repository<RatingEntity>,
  ) {}

  getUserRatingByPostId(
    authorId: number,
    postId: number,
  ): Promise<RatingEntity | null> {
    return this.ratingRepository.findOne({
      where: { postId, authorId },
    });
  }

  async getRatingByPostId(id: number): Promise<WithRating> {
    const [upvoteCount, downvoteCount] = await Promise.all([
      this.ratingRepository.count({
        where: {
          postId: id,
          rating: RatingEnum.Upvote,
        },
      }),
      this.ratingRepository.count({
        where: {
          postId: id,
          rating: RatingEnum.Downvote,
        },
      }),
    ]);

    return { upvoteCount, downvoteCount };
  }

  /**
   * Deletes rating if existed before with the same value, returns null in that case. Otherwise updates/creates rating
   */
  async toggleRating(
    data: Pick<RatingEntity, 'rating' | 'authorId' | 'postId'>,
  ): Promise<RatingEntity | null> {
    const { authorId, postId, rating } = data;

    this.logger.debug('Looking for existing rating...');

    const existingRating = await this.ratingRepository.findOne({
      where: { authorId, postId },
    });

    if (!existingRating) {
      this.logger.debug('Rating does not exist, creating one.');

      return this.ratingRepository.save(data);
    }

    this.logger.debug('Rating with same value exists!', existingRating);

    if (existingRating.rating === rating) {
      this.logger.debug('Deleting one.');
      await this.ratingRepository.delete({ authorId, postId });

      return null;
    }

    this.logger.debug('Updating one');
    await this.ratingRepository.update({ authorId, postId }, { rating });

    return this.ratingRepository.findOneOrFail({ where: { authorId, postId } });
  }
}
