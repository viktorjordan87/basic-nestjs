import { PartialType } from '@nestjs/mapped-types';
import { CreateLionDto } from './create-lion.dto';

export class UpdateLionDto extends PartialType(CreateLionDto) {}
