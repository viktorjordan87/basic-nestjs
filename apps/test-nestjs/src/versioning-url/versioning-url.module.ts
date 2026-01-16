import { Module } from '@nestjs/common';
import { VersioningUrlService } from './versioning-url.service';
import { VersioningUrlController } from './versioning-url.controller';

@Module({
  controllers: [VersioningUrlController],
  providers: [VersioningUrlService],
})
export class VersioningUrlModule {}
