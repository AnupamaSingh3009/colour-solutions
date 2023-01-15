import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Product } from './product.entity';

@Entity({ name: 'product_photos', schema: 'catalog' })
export class ProductPhotoEntity extends BaseEntity {
  @Column({ type: String, nullable: false })
  photo: string;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;
}
