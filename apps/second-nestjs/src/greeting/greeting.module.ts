import { Module } from '@nestjs/common';
import { GreetingController } from './greeting.controller';
import { GreetingService } from './greeting.service';
import { FriendlyGreetingService } from './friendly-greeting.service';
import { FormalGreetingService } from './formal-greeting.service';

// Example: Choose implementation based on environment
// In development: use FriendlyGreetingService
// In production: use FormalGreetingService
const greetingServiceProvider = {
  provide: GreetingService, // Class token - existing code can inject directly
  useClass:
    process.env.NODE_ENV === 'production'
      ? FormalGreetingService
      : FriendlyGreetingService,
};

@Module({
  controllers: [GreetingController],
  providers: [greetingServiceProvider],
  exports: [GreetingService], // Export so other modules can use it
})
export class GreetingModule {}
