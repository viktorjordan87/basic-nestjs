import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateSessionDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;
}
