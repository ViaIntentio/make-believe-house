import { NotFoundException, UnauthorizedException } from "@nestjs/common";	
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto } from "../Validation/login.dto";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "../Validation/register.dto";

export class AuthEntity extends PrismaService{
    
    async findLogin(login: LoginDto){
        const user = await this.user.findUnique({
            where:{
                email: login.email,
            }
        })
        if(user){
            if (!(await bcrypt.compare(login.password, user.password))) {
                throw new UnauthorizedException('Usuário ou senha incorretos');
              }
            throw new NotFoundException('User not found');
        }
        else{
            return user;
        }
    }

    async Register(register: RegisterDto){
        const user = await this.user.findUnique({
            where:{
                email: register.email,
            }
        })
        if(user){
            throw new UnauthorizedException('Email já cadastrado');
        }
        else{
            const data = new RegisterDto();
            data.email = register.email;
            data.password = await bcrypt.hash(register.password, 10);
            return this.user.create({
                data,
                select:{
                    id: true,
                    email: true,
                    password: false,
                    role: true,
                    name: true,
                    Cpf: true,
                    phone: true,
                    terms: true,
                }
            });
        }
    }
}
