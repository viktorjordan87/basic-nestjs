import { Module } from '@nestjs/common';
import { ExternalsService } from './externals.service';
import { ExternalsController } from './externals.controller';
import { NationalizeModule } from '../../client/nationalize';

@Module({
  imports: [NationalizeModule],
  controllers: [ExternalsController],
  providers: [ExternalsService],
})
export class ExternalsModule { }
