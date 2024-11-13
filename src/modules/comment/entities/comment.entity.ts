import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity.js';
import { PostEntity } from '../../post/entities/post.entity.js';
import { UserEntity } from '../../user/entities/user.entity.js';
import { CommentStatus } from '../enum/comment-status.enum.js';

@Entity()
export class CommentEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: Relation<UserEntity>;

  @Column({ name: 'author_id', type: 'integer' })
  authorId: number;

  @ManyToOne(() => PostEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Relation<PostEntity>;

  @Column({ name: 'post_id', type: 'integer' })
  postId: number;

  @Column({ type: 'enum', enum: CommentStatus, default: CommentStatus.Active })
  status: CommentStatus;

  @Column({ type: 'varchar' })
  body: string;
}
