import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Question } from "./question.entity";

@Table
export class QuestionOption extends Model {
    @Column({field: 'yes_totally', allowNull: false})
    yes_totally: boolean;

    @Column({field: 'yes_needs_readjustment', allowNull: false})
    yes_needs_readjustment: boolean;

    @Column({field: 'no', allowNull: false})
    no: boolean;

    @ForeignKey(() => Question)
    @Column({ field: 'question_id' })
    question_id: number;

    @Column({field: 'created_at'})
    created_at: Date;

    @Column({field: 'updated_at'})
    updated_at: Date;

    @BelongsTo(() => Question)
    question: Question;
}