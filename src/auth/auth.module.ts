import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';

@Module({
  imports: [UserModule, JwtModule.register({ secret: env.JWT_SECRET })],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
