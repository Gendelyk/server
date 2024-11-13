import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { CommentAdapter } from './adapters/comment.adapter.js';
import { CreatedCommentAdapter } from './adapters/created-comment.adapter.js';
import { CommentService } from './comment.service.js';
import { CommentDto } from './dto/comment.dto.js';
import { CreateCommentInput } from './dto/create-comment.input.js';
import { CreatedCommentDto } from './dto/created-comment.dto.js';
import { EditCommentInput } from './dto/edit-comment.input.js';

import { UserGuard } from '../auth/guards/user.guard.js';
import { Identity } from '../auth/types/identity.js';
import { ErrorOutput } from '../common/dto/error.output.js';
import { UserIdentity } from '../user/decorators/user-identity.decorator.js';

@UseGuards(UserGuard)
@ApiTags('Comment')
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Patch(':id')
  @ApiOkResponse({
    description: 'Updates comment',
    type: CommentDto,
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: EditCommentInput,
  ): Promise<CommentDto> {
    const response = await this.commentService.updateCommentById(id, data);

    return CommentAdapter.toDto(response);
  }

  @Post()
  @ApiOkResponse({
    description: 'Create a comment',
    type: CreatedCommentDto,
  })
  @ApiForbiddenResponse({
    description: 'Error message',
    type: ErrorOutput,
  })
  async createPost(
    @Body() input: CreateCommentInput,
    @UserIdentity() user: Identity,
  ): Promise<CreatedCommentDto> {
    const comment = await this.commentService.createComment({
      ...input,
      authorId: user.id,
    });

    return CreatedCommentAdapter.toDto(comment);
  }
}
