import { Module, OnModuleInit } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { DateModule } from './date/date.module';
import { PrismaModule } from './prisma/prisma.module';
import { PictureModule } from './picture/picture.module';
import { HomeModule } from './home/home.module';
import { PurchaseModule } from './purchase/purchase.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [
    UserModule,
    DateModule,
    PrismaModule,
    PictureModule,
    HomeModule,
    PurchaseModule,
    AuthModule,
    EmailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}

  async onModuleInit() {
    const exist = await this.prisma.user.findFirst();
    if (!exist) {
      await this.prisma.user.create({
        data: {
          name: 'admin',
          email: 'admin@admin.com',
          password: 'admin',
          role: 2,
        },
      });
    }
  }
}
