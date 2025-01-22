import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @IsPhoneNumber('KR')
    phone: string;
    @IsString()
    password: string;
}
