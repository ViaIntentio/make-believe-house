import {
  Injectable,
  NotFoundException,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateDateDto } from 'src/date/Validation/create-date.dto';
import { UpdateDateDto } from 'src/date/Validation/update-date.dto';
import { CreateUserDto } from 'src/user/Validation/create-user.dto';
import { RegisterDto } from 'src/auth/Validation/register.dto';
import { LoginDto } from 'src/auth/Validation/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  //Auth
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  async findLogin(login: LoginDto) {
    const user = await this.user.findUnique({
      where: {
        email: login.email,
      },
    });
    if (user) {
      if (!(await bcrypt.compare(login.password, user.password))) {
        throw new UnauthorizedException('Usuário ou senha incorretos');
      }
      throw new NotFoundException('User not found');
    } else {
      return user;
    }
  }

  async Register(register: RegisterDto) {
    const user = await this.user.findUnique({
      where: {
        email: register.email,
      },
    });
    if (user) {
      throw new UnauthorizedException('Email já cadastrado');
    } else {
      const data = new RegisterDto();
      data.email = register.email;
      data.password = await bcrypt.hash(register.password, 10);
      return this.CreateUser(data);
    }
  }

  //User
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  async CreateUser(data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password);
    return this.user.create({
      data,
      select: {
        id: true,
        email: true,
        password: false,
        role: true,
        name: true,
        Cpf: true,
        phone: true,
        terms: true,
      },
    });
  }

  GetUserById(id: string) {
    return this.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        password: false,
        role: true,
        name: true,
        Cpf: true,
        phone: true,
        terms: true,
      },
    });
  }

  GetUserByEmail(email: string) {
    return this.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: false,
        role: true,
        name: true,
        Cpf: true,
        phone: true,
        terms: true,
      },
    });
  }

  GetAllTrueUsers() {
    return this.user.findMany({
      where: { terms: true },
      select: {
        id: true,
        email: true,
        password: false,
        role: true,
        name: true,
        Cpf: true,
        phone: true,
        terms: true,
      },
    });
  }

  UpdateUser(id: string, data: CreateUserDto) {
    return this.user.update({
      data,
      where: { id },
      select: {
        id: true,
        email: true,
        password: false,
        role: true,
        name: true,
        Cpf: true,
        phone: true,
        terms: true,
      },
    });
  }

  DeleteUser(id: string) {
    return this.user.delete({
      where: { id },
      select: {
        id: true,
        email: true,
        password: false,
        role: true,
        name: true,
        Cpf: true,
        phone: true,
        terms: true,
      },
    });
  }

  //HomePrice
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  //Date
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  CreateDate(data: CreateDateDto) {
    return this.date.create({
      data,
    });
  }

  GetAllDate() {
    return this.date.findMany();
  }

  GetDateById(id: string) {
    return this.date.findUnique({
      where: {
        id: id,
      },
    });
  }

  UpdateDate(id: string, data: UpdateDateDto) {
    return this.date.update({
      where: {
        id: id,
      },
      data,
    });
  }

  DeleteDate(id: string) {
    return this.date.delete({
      where: {
        id: id,
      },
    });
  }
}
