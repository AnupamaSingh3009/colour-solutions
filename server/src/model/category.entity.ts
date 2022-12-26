import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity({name: "categories", schema: "catalog"})
export default class Category extends BaseEntity{

    @Column({type: String, nullable: false, unique: true})
    name: string;

    @Column({type: 'text'})
    description: string;

}