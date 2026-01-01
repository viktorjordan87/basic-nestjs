import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, Validate } from 'class-validator';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {
  @IsString()
  @IsOptional()
  @Validate(
    (value: string) => uuidValidate(value) && uuidVersion(value) === 7,
    {
      message: 'customerId must be a valid UUID v7',
    },
  )
  customerId?: string;
}
