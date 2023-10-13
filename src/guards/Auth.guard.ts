import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    try {
      const data = await this.authService.checkToken(
        (authorization ?? '').split(' ')[1],
      );

      request.usuario = data;

      request.usuario = await this.prisma.GetUserById(data.id);

      return true;
    } catch {
      console.log({
        AuthGuard:
          'src/guards/AuthGuard: Token não identificado.(token não valido)',
      });
      return false;
    }
  }
}
