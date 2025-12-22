import { Controller, Get } from '@nestjs/common';
import { SecondNestjsService } from './second-nestjs.service';

@Controller()
export class SecondNestjsController {
  constructor(private readonly secondNestjsService: SecondNestjsService) {}

  @Get()
  getHello(): string {
    return this.secondNestjsService.getHello();
  }
}
