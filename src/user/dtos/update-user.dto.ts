import { IsEmail, IsEnum, IsString, IsStrongPassword } from "class-validator";
import { UserType } from "../enums/user.type";

export class UpdateUserDTO {
    @IsString()
    public name: string;

    @IsEmail()
    public email: string;

    @IsString()
    @IsStrongPassword()
    public password: string;

    @IsEnum(UserType)
    public role: UserType
}