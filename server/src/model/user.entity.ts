import { Entity, Column, BeforeInsert } from 'typeorm';
import { BaseEntity } from './base.entity';
import {hash} from 'bcrypt';
import { RoleEnum } from './role.enum';

@Entity({ name: 'users' })
export class User extends BaseEntity {

    @Column({type: String, unique: true})
    username: string;

    @Column({type: String})
    firstName: string;

    @Column({type: String, nullable: true})
    lastName: string;

    @Column({type: String, nullable: true})
    address: string;

    @Column({type: String, nullable: true})
    mobile: string;

    @Column({type: String, nullable: true})
    email: string;

    @Column({type: String})
    password: string;

    @Column({type: "enum", enum: RoleEnum, default: RoleEnum.ANONYMOUS})
    role: RoleEnum;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10)
    }
 
}