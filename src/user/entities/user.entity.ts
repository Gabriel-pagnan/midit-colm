import { Column,  Model,  Table } from "sequelize-typescript";
import { UserType } from "../enums/user.type";

@Table
export class User extends Model {
    @Column({field: 'name', allowNull: false})
    name: string;

    @Column({
        field: 'email', 
        allowNull: false, 
        unique: true
    })
    email: string

    @Column({field: 'password', allowNull: false})
    password: string

    @Column({field: 'role', defaultValue: UserType.User})
    role: string

    @Column({field: 'created_at'})
    created_at: Date

    @Column({field: 'updated_at'})
    updated_at: Date
}