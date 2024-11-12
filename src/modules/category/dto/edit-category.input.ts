import { PartialType, PickType } from '@nestjs/swagger';

import { CategoryDto } from './category.dto.js';

export class EditCategoryInput extends PartialType(
  PickType(CategoryDto, ['status', 'title']),
) {}
