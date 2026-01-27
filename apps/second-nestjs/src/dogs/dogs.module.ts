import { Module } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { DogsEventListener } from './events/dogs.event-listener';

@Module({
  controllers: [DogsController],
  providers: [DogsService, DogsEventListener],
})
export class DogsModule {}
