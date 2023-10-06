import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "../Validation/create-user.dto";
import * as bcrypt from 'bcrypt';

export abstract class User extends PrismaService {
    private prisma: PrismaService;

    async CreateUser(data: CreateUserDto){
        data.password = await bcrypt.hash(data.password);
        return this.prisma.user.create({
            data,
        });
    }

    GetUserById(id: string){
        return this.prisma.user.findUnique({
            where: { id },
        });
    }

    GetUserByEmail(email: string){
        return this.prisma.user.findUnique({
            where: { email },
        });
    }

    GetAllTrueUsers(){
        return this.prisma.user.findMany({
            where: { terms: true },
        });
    }

    UpdateUser(id: string, data: CreateUserDto){
        return this.prisma.user.update({
            data,
            where: { id },
        });
    }

    DeleteUser(id: string){
        return this.prisma.user.delete({
            where: { id },
        });
    }

}
