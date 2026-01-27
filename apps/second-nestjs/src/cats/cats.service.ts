import { Injectable, Inject } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { HorsesService } from '../horses/horses.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from '../events';

@Injectable()
export class CatsService {
  constructor(
    @Inject('HORSES_SERVICE')
    private readonly horsesService: HorsesService,
    private eventEmitter: EventEmitter2,
  ) {}

  create(createCatDto: CreateCatDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access -- EventEmitter2 types not resolved in this project's tsconfig
    this.eventEmitter.emit(EVENTS.CAT_CREATED, createCatDto);
    return 'This action adds a new cat';
  }

  findAll() {
    return `This action returns all cats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
