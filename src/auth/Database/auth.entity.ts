import { NotFoundException, UnauthorizedException } from "@nestjs/common";	
import { PrismaService } from "src/prisma/prisma.service";
import { LoginDto } from "../Validation/login.dto";
import * as bcrypt from 'bcrypt';

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
}
