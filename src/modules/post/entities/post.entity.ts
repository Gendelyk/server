import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Relation,
} from 'typeorm';

import { CategoryEntity } from '../../category/entities/category.entity.js';
import { CommentEntity } from '../../comment/entities/comment.entity.js';
import { BaseEntity } from '../../common/entities/base-entity.entity.js';
import { UserEntity } from '../../user/entities/user.entity.js';
import { PostStatus } from '../enum/post-status.enum.js';

@Entity()
export class PostEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: Relation<UserEntity>;

  @Column({ name: 'author_id', type: 'integer' })
  authorId: number;

  @OneToMany(() => CommentEntity, (comment) => comment.post)
  comments: CommentEntity[];

  @ManyToOne(() => CategoryEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'category_id' })
  category: Relation<CategoryEntity>;

  @Column({ name: 'category_id', type: 'integer' })
  categoryId: number;

  @Column({ type: 'varchar' })
  body: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ enum: PostStatus, type: 'enum', default: PostStatus.Active })
  status: PostStatus;
}
