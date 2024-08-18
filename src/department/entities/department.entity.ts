import { Column, HasMany, Model, Table } from "sequelize-typescript";
import { Question } from "../../question/entities/question.entity";

@Table
export class Department extends Model {
    @Column({field: 'name', allowNull: false})
    name: string;

    @Column({field: 'description'})
    description: string;

    @Column({field: 'createdAt'})
    createdAt: Date

    @Column({field: 'updatedAt'})
    updatedAt: Date

    @HasMany(() => Question)
    questions: Question[];
}