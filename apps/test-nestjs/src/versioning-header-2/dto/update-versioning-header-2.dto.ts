import { PartialType } from '@nestjs/mapped-types';
import { CreateVersioningHeader2Dto } from './create-versioning-header-2.dto';

export class UpdateVersioningHeader2Dto extends PartialType(CreateVersioningHeader2Dto) {}
