import { CategoryDto } from '../dto/category.dto.js';
import { CategoryEntity } from '../entities/category.entity.js';

export class CategoryAdapter {
  static toDto(entity: CategoryEntity): CategoryDto {
    return {
      title: entity.title,
      id: entity.id,
      status: entity.status,
    };
  }
}
