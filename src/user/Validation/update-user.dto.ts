import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, IsOptional, IsIdentityCard, IsPhoneNumber, IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {

    @IsOptional()
    @IsString()
    name : string;

    @IsOptional()
    @IsIdentityCard('ES')
    Cpf : string;

    @IsOptional()
    @IsPhoneNumber('BR')
    phone : string;

    @IsOptional()
    @IsBoolean()
    terms : boolean;

}
