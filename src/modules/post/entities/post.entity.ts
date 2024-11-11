import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity.js';
import { UserEntity } from '../../user/entities/user.entity.js';
import { PostStatus } from '../enum/post-status.enum.js';

@Entity()
export class PostEntity extends BaseEntity {
  @OneToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: Relation<UserEntity>;

  @Column({ name: 'author_id', type: 'integer' })
  authorId: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  body: string;

  @Column({ enum: PostStatus, type: 'enum' })
  status: PostStatus;
}
