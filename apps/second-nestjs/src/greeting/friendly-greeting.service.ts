import { Injectable } from '@nestjs/common';
import { GreetingService } from './greeting.service';

@Injectable()
export class FriendlyGreetingService extends GreetingService {
  greet(name: string): string {
    return `Hey ${name}! 👋 How's it going?`;
  }
}
