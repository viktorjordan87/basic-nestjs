import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DiscoveriesService } from './discoveries.service';
import { DiscoveriesController } from './discoveries.controller';

@Module({
  imports: [DiscoveryModule],
  controllers: [DiscoveriesController],
  providers: [DiscoveriesService],
})
export class DiscoveriesModule {}
