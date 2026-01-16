import { PartialType } from '@nestjs/mapped-types';
import { CreateVersioningUrlDto } from './create-versioning-url.dto';

export class UpdateVersioningUrlDto extends PartialType(CreateVersioningUrlDto) {}
