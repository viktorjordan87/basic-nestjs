import { Injectable } from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateAnimalDto } from './dto/create-animal.dto';
import { UpdateAnimalDto } from './dto/update-animal.dto';
import { CatsService } from '../cats/cats.service';

@Injectable()
export class AnimalsService {
  private catsService: CatsService;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.catsService = this.moduleRef.get(CatsService, { strict: false });
  }

  create(createAnimalDto: CreateAnimalDto) {
    return 'This action adds a new animal';
  }

  findAll() {
    const cat = this.catsService.findAll();
    console.log(cat);
    return `This action returns all animals ${cat}`;
  }

  findOne(id: number) {
    return `This action returns a #${id} animal`;
  }

  update(id: number, updateAnimalDto: UpdateAnimalDto) {
    return `This action updates a #${id} animal`;
  }

  remove(id: number) {
    return `This action removes a #${id} animal`;
  }
}
