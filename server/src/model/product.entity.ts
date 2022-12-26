import { Column, Entity, JoinColumn,  ManyToOne } from "typeorm";
import Category from "./category.entity";
import { BaseEntity } from "./base.entity";

@Entity({name: "products", schema: "catalog"})
export class Product extends BaseEntity {

    @Column({type: String, nullable: false, unique: true})
    name: string;

    @Column({type: 'text'})
    description: string;

    @Column({type: 'float'})
    price: number;

    @Column({type: String})
    size: string;

    @Column({type: String})
    color: string;

    @Column({type: String})
    material: string;

    @ManyToOne(() => Category)
    @JoinColumn({name: 'category_id', referencedColumnName: 'id'})
    category: Category;
}