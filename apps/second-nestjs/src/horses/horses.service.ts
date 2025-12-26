import { Injectable } from '@nestjs/common';
import { CreateHorseDto } from './dto/create-horse.dto';
import { UpdateHorseDto } from './dto/update-horse.dto';

@Injectable()
export class HorsesService {
  create(createHorseDto: CreateHorseDto) {
    return 'This action adds a new horse';
  }

  findAll() {
    return `This action returns all horses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} horse`;
  }

  update(id: number, updateHorseDto: UpdateHorseDto) {
    return `This action updates a #${id} horse`;
  }

  remove(id: number) {
    return `This action removes a #${id} horse`;
  }
}
