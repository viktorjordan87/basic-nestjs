import { Injectable } from '@nestjs/common';
import { CreateExternalDto } from './dto/create-external.dto';
import { UpdateExternalDto } from './dto/update-external.dto';
import { NationalizeService } from '../../client/nationalize';

@Injectable()
export class ExternalsService {

  constructor(private readonly nationalizeService: NationalizeService) {

  }

  create(createExternalDto: CreateExternalDto) {
    return 'This action adds a new external';
  }

  findAll() {
    return `This action returns all externals`;
  }

  findOne(id: number) {
    return `This action returns a #${id} external`;
  }

  update(id: number, updateExternalDto: UpdateExternalDto) {
    return `This action updates a #${id} external`;
  }

  remove(id: number) {
    return `This action removes a #${id} external`;
  }

  findByName(first_name: string) {
    return this.nationalizeService.getNationality(first_name);
  }
}
