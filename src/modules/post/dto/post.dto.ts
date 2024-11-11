import { ApiProperty } from '@nestjs/swagger';

import { UserDto } from '../../user/dto/user.dto.js';
import { PostStatus } from '../enum/post-status.enum.js';

export class PostDto {
  @ApiProperty()
  id: number;

  @ApiProperty({ type: UserDto })
  author: UserDto;

  @ApiProperty()
  title: string;

  @ApiProperty()
  body: string;

  @ApiProperty({ enum: PostStatus })
  status: PostStatus;
}
