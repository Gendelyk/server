import { ResetPasswordCodeEntity } from '../auth/entities/resset-password.entity.js';
import { CategoryEntity } from '../category/entities/category.entity.js';
import { CommentEntity } from '../comment/entities/comment.entity.js';
import { SearchHistoryEntity } from '../history/entities/search-history.entity.js';
import { PostEntity } from '../post/entities/post.entity.js';
import { UserEntity } from '../user/entities/user.entity.js';

export const entities = [
  UserEntity,
  ResetPasswordCodeEntity,
  SearchHistoryEntity,
  PostEntity,
  CommentEntity,
  CategoryEntity,
];
