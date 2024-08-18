import { IsNumber, IsString } from "class-validator";

export class CreateQuestionDTO {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsString()
    response: string;

    @IsNumber()
    department_id: number;
}