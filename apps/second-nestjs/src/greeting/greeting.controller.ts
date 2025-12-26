import { Controller, Get, Param } from '@nestjs/common';
import { GreetingService } from './greeting.service';

@Controller('greeting')
export class GreetingController {
  constructor(private readonly greetingService: GreetingService) {}

  @Get(':name')
  getGreeting(@Param('name') name: string): string {
    return this.greetingService.greet(name);
  }
}
