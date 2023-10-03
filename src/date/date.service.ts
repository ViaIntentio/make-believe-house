import { Injectable } from '@nestjs/common';
import { CreateDateDto } from './Validation/create-date.dto';
import { UpdateDateDto } from './Validation/update-date.dto';

@Injectable()
export class DateService {
  create(data: CreateDateDto) {
    return 'This action adds a new date';
  }

  findAll() {
    return `This action returns all date`;
  }

  findOne(id: string) {
    return `This action returns a #${id} date`;
  }

  update(id: string, data: UpdateDateDto) {
    return `This action updates a #${id} date`;
  }

  remove(id: string) {
    return `This action removes a #${id} date`;
  }
}
