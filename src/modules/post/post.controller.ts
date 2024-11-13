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

import { PostAdapter } from './adapters/post.adapter.js';
import { PostWithCommentsAdapter } from './adapters/post-with-comments.adapter.js';
import { CreatePostInput } from './dto/create-post.input.js';
import { EditPostInput } from './dto/edit-post.input.js';
import { PostDto } from './dto/post.dto.js';
import { PostWithCommentsDto } from './dto/post-with-comments.dto.js';
import { PostService } from './post.service.js';

import { UserGuard } from '../auth/guards/user.guard.js';
import { Identity } from '../auth/types/identity.js';
import { ErrorOutput } from '../common/dto/error.output.js';
import { UserIdentity } from '../user/decorators/user-identity.decorator.js';

@UseGuards(UserGuard)
@ApiTags('Post')
@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns all posts',
    type: [PostDto],
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async getPosts(): Promise<PostDto[]> {
    const data = await this.postService.getAllAvailablePosts();

    return data.map(PostAdapter.toDto);
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Returns post with specified id and comments',
    type: PostWithCommentsDto,
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async getPost(
    @Param('id', ParseIntPipe) postId: number,
  ): Promise<PostWithCommentsDto> {
    const data = await this.postService.getPostByIdOrFail(postId);

    return PostWithCommentsAdapter.toDto(data);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Updates post',
    type: PostDto,
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async updatePost(
    @Param('id', ParseIntPipe) postId: number,
    @Body() data: EditPostInput,
  ): Promise<PostDto> {
    const response = await this.postService.updatePostById(postId, data);

    return PostAdapter.toDto(response);
  }

  @Post()
  @ApiOkResponse({
    description: 'Create a post',
    type: PostDto,
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async createPost(
    @Body() input: CreatePostInput,
    @UserIdentity() user: Identity,
  ): Promise<PostDto> {
    const post = await this.postService.createPost({
      ...input,
      authorId: user.id,
    });

    return PostAdapter.toDto(post);
  }
}
