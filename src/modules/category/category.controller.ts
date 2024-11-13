import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CategoryAdapter } from './adapters/category.adapter.js';
import { CategoryService } from './category.service.js';
import { CategoryDto } from './dto/category.dto.js';
import { CreateCategoryInput } from './dto/create-category.input.js';
import { EditCategoryInput } from './dto/edit-category.input.js';

import { UserGuard } from '../auth/guards/user.guard.js';
import { ErrorOutput } from '../common/dto/error.output.js';

@UseGuards(UserGuard)
@ApiTags('Category')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns all categories',
    type: [CategoryDto],
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async getCategories(): Promise<CategoryDto[]> {
    const data = await this.categoryService.getAllCategories();

    return data.map(CategoryAdapter.toDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns category with specified id',
    type: CategoryDto,
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async getCategory(
    @Param('id', ParseIntPipe) categoryId: number,
  ): Promise<CategoryDto> {
    const data = await this.categoryService.getCategoryByIdOrFail(categoryId);

    return CategoryAdapter.toDto(data);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Updates category',
    type: CategoryDto,
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async updatePost(
    @Param('id', ParseIntPipe) categoryId: number,
    @Body() data: EditCategoryInput,
  ): Promise<CategoryDto> {
    const response = await this.categoryService.updateCategoryById(
      categoryId,
      data,
    );

    return CategoryAdapter.toDto(response);
  }

  @Post()
  @ApiOkResponse({
    description: 'Create a post',
    type: CategoryDto,
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async createPost(@Body() input: CreateCategoryInput): Promise<CategoryDto> {
    const category = await this.categoryService.createCategory(input);

    const newCategory = await this.categoryService.getCategoryByIdOrFail(
      category.id,
    );

    return CategoryAdapter.toDto(newCategory);
  }
}
