import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'pages', schema: 'catalog' })
export class Page extends BaseEntity {
  @Column({ type: String, nullable: false, unique: true })
  title: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: String, nullable: false, unique: true })
  link: string;
}
