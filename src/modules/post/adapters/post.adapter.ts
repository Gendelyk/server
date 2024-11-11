import { UserAdapter } from '../../user/adapters/user.adapter.js';
import { PostDto } from '../dto/post.dto.js';
import { PostEntity } from '../entities/post.entity.js';

export class PostAdapter {
  static toDto(entity: PostEntity): PostDto {
    return {
      author: UserAdapter.toDto(entity.author),
      body: entity.body,
      title: entity.title,
      id: entity.id,
      status: entity.status,
    };
  }
}
