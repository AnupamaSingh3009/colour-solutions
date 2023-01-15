import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import Category from './category.entity';
import { BaseEntity } from './base.entity';
import { ProductPhotoEntity } from './product-photo.entity';
import { RoleEnum } from './role.enum';
import { GenderEnum } from './gender.enum';

@Entity({ name: 'products', schema: 'catalog' })
export class Product extends BaseEntity {
  @Column({ type: String, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'float' })
  price: number;

  @Column({ type: String })
  size: string;

  @Column({ type: String })
  color: string;

  @Column({ type: String })
  material: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category: Category;

  @OneToMany(() => ProductPhotoEntity, (photoEntity) => photoEntity.product, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  photos: ProductPhotoEntity[];

  @Column({ type: 'enum', enum: GenderEnum, default: GenderEnum.UNISEX })
  gender: GenderEnum;

  @Column({ type: 'numeric', default: 0 })
  quantity: number;
}
