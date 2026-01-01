import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import type { CustomerAddressType } from './customer-address.dto';
import { CustomerAddressDto } from './customer-address.dto';

export class CreateCustomerDto {
  @IsString()
  @IsOptional()
  customerId?: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsObject()
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CustomerAddressDto)
  address: CustomerAddressType;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
