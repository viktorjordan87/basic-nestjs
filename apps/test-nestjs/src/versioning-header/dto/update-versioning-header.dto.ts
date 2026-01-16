import { PartialType } from '@nestjs/mapped-types';
import { CreateVersioningHeaderDto } from './create-versioning-header.dto';

export class UpdateVersioningHeaderDto extends PartialType(CreateVersioningHeaderDto) {}
