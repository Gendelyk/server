import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity.js';
import { PostEntity } from '../../post/entities/post.entity.js';
import { UserEntity } from '../../user/entities/user.entity.js';

@Entity()
export class CommentEntity extends BaseEntity {
  @OneToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: Relation<UserEntity>;

  @Column({ name: 'author_id', type: 'integer' })
  authorId: number;

  @OneToOne(() => PostEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: Relation<PostEntity>;

  @Column({ name: 'post_id', type: 'integer' })
  postId: number;

  @Column({ type: 'varchar' })
  body: string;
}
