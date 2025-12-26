# useClass Provider Example

This is a simple example demonstrating the `useClass` provider pattern in NestJS.

## Structure

- **`greeting.service.ts`** - Abstract base class (the token)
- **`friendly-greeting.service.ts`** - Friendly implementation
- **`formal-greeting.service.ts`** - Formal implementation
- **`greeting.module.ts`** - Module using `useClass` to choose implementation
- **`greeting.controller.ts`** - Controller that uses the service

## How It Works

In `greeting.module.ts`, we use `useClass` to dynamically choose which implementation to use:

```typescript
const greetingServiceProvider = {
  provide: GreetingService,  // Token (abstract class)
  useClass:
    process.env.NODE_ENV === 'production'
      ? FormalGreetingService    // Production: formal
      : FriendlyGreetingService, // Development: friendly
};
```

## Testing

1. **Development mode** (default):
   ```bash
   GET /greeting/John
   # Returns: "Hey John! 👋 How's it going?"
   ```

2. **Production mode**:
   ```bash
   NODE_ENV=production npm start
   GET /greeting/John
   # Returns: "Good day, John. I hope you are well."
   ```

## Key Concepts

- **Token**: `GreetingService` (abstract class) - what other classes depend on
- **Implementation**: `FriendlyGreetingService` or `FormalGreetingService` - what actually gets injected
- **Dynamic Selection**: `useClass` allows choosing the implementation at runtime
- **Dependency Injection**: `GreetingController` depends on `GreetingService`, but gets the chosen implementation

## Use Cases

- Environment-specific implementations
- Feature flags
- A/B testing
- Different implementations for different regions
- Mock implementations for testing

