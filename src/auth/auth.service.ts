import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './Validation/login.dto';
import { RegisterDto } from './Validation/register.dto';
import { CreateUserDto } from 'src/user/Validation/create-user.dto';
import { AuthEntity } from './Database/auth.entity';

@Injectable()
export class AuthService extends AuthEntity {
  private issuer = 'CFDC-auth-system';
  private audience = 'user';
  constructor(private readonly jwt: JwtService) {
    super();
  }

  async login(login: LoginDto) {
    const user = await this.findLogin(login);
    return this.createToken(user);
  }

  async register(register: RegisterDto) {
    const user = await this.findLogin(register);
    const newRegisterU = new CreateUserDto();
    newRegisterU.email = register.email;
    newRegisterU.password = register.password;
    return this.Register(newRegisterU);
  }

  async createToken(user: {
    id: string;
    email: string;
    role: number;
    name: string;
    Cpf: string;
    phone: string;
    terms: boolean;
  }) {
    return {
      token: this.jwt.sign(
        {
          id: user.id,
          acess: user.role,
        },
        {
          expiresIn: '7 days',
          subject: user.id,
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
      user: user,
    };
  }

  async checkToken(token: string) {
    try {
      const data = this.jwt.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (e) {
      throw new UnauthorizedException('O token não foi identificado');
    }
  }

  validToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
