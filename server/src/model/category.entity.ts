import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { ProductPhotoEntity } from './product-photo.entity';
import { Product } from './product.entity';

@Entity({ name: 'categories', schema: 'catalog' })
export default class Category extends BaseEntity {
  @Column({ type: String, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn()
  products: Product[];

  @OneToOne(() => Category, (category) => category.id)
  @JoinColumn()
  parent: Category;
}
