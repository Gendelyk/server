import { RatingDto } from '../dto/rating.dto.js';
import { RatingEntity } from '../entities/rating.entity.js';

export class RatingAdapter {
  static toDto(entity: RatingEntity): RatingDto {
    return {
      id: entity.id,
      rating: entity.rating,
      postId: entity.postId,
    };
  }
}
