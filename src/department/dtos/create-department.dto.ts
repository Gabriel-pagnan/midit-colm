import { IsOptional, IsString } from "class-validator";

export class CreateDepartmentDTO {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;
}