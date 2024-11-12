import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CategoryEntity } from './entities/category.entity.js';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  getAllCategories(): Promise<CategoryEntity[]> {
    return this.categoryRepository.find();
  }

  createCategory(data: Pick<CategoryEntity, 'title'>): Promise<CategoryEntity> {
    return this.categoryRepository.save(data);
  }

  getCategoryByIdOrFail(categoryId: number): Promise<CategoryEntity> {
    return this.categoryRepository.findOneOrFail({
      where: { id: categoryId },
    });
  }

  async updateCategoryById(
    categoryId: number,
    data: Partial<CategoryEntity>,
  ): Promise<CategoryEntity> {
    await this.categoryRepository.update(categoryId, data);

    return this.getCategoryByIdOrFail(categoryId);
  }
}
