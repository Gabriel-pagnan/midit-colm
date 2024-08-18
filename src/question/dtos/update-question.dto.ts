import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateQuestioDTO {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString()
    @IsOptional()
    response: string;

    @IsNumber()
    @IsOptional()
    department_id: number
}