import { Injectable } from '@nestjs/common';
import { CreateDateDto } from './Validation/create-date.dto';
import { UpdateDateDto } from './Validation/update-date.dto';
import { Date } from './Database/date.entity';

@Injectable()
export class DateService extends Date {
  create(data: CreateDateDto) {
    return this.CreateDate(data);
  }

  findAll() {
    return this.GetAllDate();
  }

  findOne(id: string) {
    return this.GetDateById(id);
  }

  update(id: string, data: UpdateDateDto) {
    return this.UpdateDate(id, data);
  }

  remove(id: string) {
    return this.DeleteDate(id);
  }
}
