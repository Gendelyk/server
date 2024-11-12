import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';

import { UserDto } from '../../user/dto/user.dto.js';
import { PostStatus } from '../enum/post-status.enum.js';

export class PostDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: UserDto })
  author: UserDto;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ enum: PostStatus })
  @IsEnum(PostStatus)
  status: PostStatus;
}
