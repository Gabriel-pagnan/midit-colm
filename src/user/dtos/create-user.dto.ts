import { IsEmail, IsEnum, IsOptional, IsString, IsStrongPassword } from "class-validator";
import { UserType } from "../enums/user.type";

export class CreateUserDTO {
    @IsString()
    public name: string;

    @IsEmail()
    public email: string;

    @IsStrongPassword()
    public password: string;

    @IsOptional()
    @IsEnum(UserType)
    public role: UserType
}