import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';

import { CommentEntity } from '../../comment/entities/comment.entity.js';
import { BaseEntity } from '../../common/entities/base-entity.entity.js';
import { PostEntity } from '../../post/entities/post.entity.js';
import { UserEntity } from '../../user/entities/user.entity.js';
import { RatingEnum } from '../enum/rating.enum.js';

@Entity('ratings')
export class RatingEntity extends BaseEntity {
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

  @Column({ name: 'post_id', type: 'integer', nullable: true })
  postId: number;

  @ManyToOne(() => CommentEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'comment_id' })
  comment?: Relation<CommentEntity>;

  @Column({ name: 'comment_id', type: 'integer', nullable: true })
  commentId?: number;

  @Column({ type: 'enum', enum: RatingEnum })
  rating: RatingEnum;
}
