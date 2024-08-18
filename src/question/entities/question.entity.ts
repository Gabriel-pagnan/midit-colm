import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Department } from "../../department/entities/department.entity";

@Table
export class Question extends Model {
    @Column({field: 'title', allowNull: false})
    title: string;

    @Column({field: 'description'})
    description: string;

    @Column({field: 'response'})
    response: string;

    @ForeignKey(() => Department)
    @Column({ field: 'department_id' })
    department_id: number;

    @Column({field: 'createdAt'})
    createdAt: Date;

    @Column({field: 'updatedAt'})
    updatedAt: Date;

    @BelongsTo(() => Department)
    department: Department;
}