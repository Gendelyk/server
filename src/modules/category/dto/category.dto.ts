import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

import { CategoryStatus } from '../enum/category-status.enum.js';

export class CategoryDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty({ enum: CategoryStatus })
  @IsEnum(CategoryStatus)
  status: CategoryStatus;
}
