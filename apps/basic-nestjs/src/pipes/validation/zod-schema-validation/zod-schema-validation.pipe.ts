import {
  BadRequestException,
  PipeTransform,
  ArgumentMetadata,
} from '@nestjs/common';
import { ZodType } from 'zod';

export class ZodSchemaValidationPipe implements PipeTransform {
  constructor(private schema: ZodType) {}

  transform(value: any, metadata: ArgumentMetadata) {
    try {
      const parsedValue = this.schema.parse(value);
      return parsedValue;
    } catch (error) {
      throw new BadRequestException('Validation failed');
    }
  }
}
