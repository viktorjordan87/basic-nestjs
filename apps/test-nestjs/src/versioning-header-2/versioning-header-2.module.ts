import { Module } from '@nestjs/common';
import { VersioningHeader2Service } from './versioning-header-2.service';
import { VersioningHeader2Controller } from './versioning-header-2.controller';

@Module({
  controllers: [VersioningHeader2Controller],
  providers: [VersioningHeader2Service],
})
export class VersioningHeader2Module {}
