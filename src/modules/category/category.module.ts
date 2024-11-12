import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller.js';
import { CategoryService } from './category.service.js';
import { CategoryEntity } from './entities/category.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService],
  controllers: [CategoryController],
})
export class CategoryModule {}
