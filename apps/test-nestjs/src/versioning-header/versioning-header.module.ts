import { Module } from '@nestjs/common';
import { VersioningHeaderService } from './versioning-header.service';
import { VersioningHeaderController } from './versioning-header.controller';

@Module({
  controllers: [VersioningHeaderController],
  providers: [VersioningHeaderService],
})
export class VersioningHeaderModule {}
