import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../common/entities/base-entity.entity.js';
import { CategoryStatus } from '../enum/category-status.enum.js';

@Entity()
export class CategoryEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({
    enum: CategoryStatus,
    type: 'enum',
    default: CategoryStatus.Active,
  })
  status: CategoryStatus;
}
