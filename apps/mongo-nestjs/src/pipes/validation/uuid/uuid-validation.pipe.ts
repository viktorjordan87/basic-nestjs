import { PipeTransform, BadRequestException } from '@nestjs/common';
import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export class UUIDValidationPipe implements PipeTransform {
  constructor(private version?: number) {
    this.version = version;
  }

  transform(uuid: string): string {
    if (!uuidValidate(uuid)) {
      throw new BadRequestException('Invalid UUID format');
    }

    if (this.version && uuidVersion(uuid) !== this.version) {
      throw new BadRequestException(`Invalid UUID version ${this.version}`);
    }

    return uuid;
  }
}
