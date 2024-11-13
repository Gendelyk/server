import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RatingEntity } from './entities/rating.entity.js';
import { RatingController } from './rating.controller.js';
import { RatingService } from './rating.service.js';

@Module({
  imports: [TypeOrmModule.forFeature([RatingEntity])],
  providers: [RatingService],
  controllers: [RatingController],
  exports: [RatingService],
})
export class RatingModule {}
