import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

import { UserDto } from '../../user/dto/user.dto.js';
import { CommentStatus } from '../enum/comment-status.enum.js';

export class CommentDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ type: UserDto })
  author: UserDto;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty({ enum: CommentStatus })
  @IsEnum(CommentStatus)
  status: CommentStatus;
}
