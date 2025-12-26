// Abstract class used as a token for dependency injection
// Existing code can inject GreetingService directly without @Inject()
export abstract class GreetingService {
  abstract greet(name: string): string;
}
