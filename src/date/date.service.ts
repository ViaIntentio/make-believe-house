import { Injectable } from '@nestjs/common';
import { CreateDateDto } from './Validation/create-date.dto';
import { UpdateDateDto } from './Validation/update-date.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DateService {

  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateDateDto) {
    return this.prisma.CreateDate(data);
  }

  findAll() {
    return this.prisma.GetAllDate();
  }

  findOne(id: string) {
    return this.prisma.GetDateById(id);
  }

  update(id: string, data: UpdateDateDto) {
    return this.prisma.UpdateDate(id, data);
  }

  remove(id: string) {
    return this.prisma.DeleteDate(id);
  }
}
