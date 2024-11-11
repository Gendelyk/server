import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity.js';
import { UserEntity } from '../../user/entities/user.entity.js';

@Entity()
export class SearchHistoryEntity extends BaseEntity {
  @OneToOne(() => UserEntity, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @Column({ name: 'user_id', type: 'integer' })
  userId: number;

  @Column({ type: 'varchar' })
  query: string;
}