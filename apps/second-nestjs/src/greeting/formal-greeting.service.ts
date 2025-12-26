import { Injectable } from '@nestjs/common';
import { GreetingService } from './greeting.service';

@Injectable()
export class FormalGreetingService extends GreetingService {
  greet(name: string): string {
    return `Good day, ${name}. I hope you are well.`;
  }
}
