import { Module } from '@nestjs/common';
import { CachesService } from './caches.service';
import { CachesController } from './caches.controller';
import { CustomersModule } from '../customers/customers.module';

@Module({
  imports: [CustomersModule],
  controllers: [CachesController],
  providers: [CachesService],
})
export class CachesModule {}
