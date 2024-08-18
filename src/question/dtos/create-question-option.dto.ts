import { IsBoolean, IsNumber } from "class-validator";

export class CreateQuestionOptionDTO {
    @IsBoolean()
    yes_totally: boolean;

    @IsBoolean()
    yes_needs_readjustment: boolean;

    @IsBoolean()
    no: boolean;

    @IsNumber()
    question_id: number;
}