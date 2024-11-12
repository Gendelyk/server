import { PickType } from '@nestjs/swagger';

import { CategoryDto } from './category.dto.js';

export class CreateCategoryInput extends PickType(CategoryDto, ['title']) {}
