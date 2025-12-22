import { Module } from '@nestjs/common';
import { SecondNestjsController } from './second-nestjs.controller';
import { SecondNestjsService } from './second-nestjs.service';
import { ConfigModule } from '@nestjs/config';
import { getEnvironmentConfig } from '@common/config/environment.config';

@Module({
  imports: [ConfigModule.forRoot(getEnvironmentConfig('second-nestjs'))],
  controllers: [SecondNestjsController],
  providers: [SecondNestjsService],
})
export class SecondNestjsModule {}
