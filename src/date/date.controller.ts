import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DateService } from './date.service';
import { CreateDateDto } from './Validation/create-date.dto';
import { UpdateDateDto } from './Validation/update-date.dto';

@Controller('date')
export class DateController {
  constructor(private readonly dateService: DateService) {}

  @Post()
  create(@Body() data: CreateDateDto) {
    return this.dateService.create(data);
  }

  @Get()
  findAll() {
    return this.dateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dateService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateDateDto) {
    return this.dateService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dateService.remove(id);
  }
}
