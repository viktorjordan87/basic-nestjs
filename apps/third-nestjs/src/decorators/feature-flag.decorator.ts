import { DiscoveryService } from '@nestjs/core';

// Create the decorator - it has a unique metadata key internally
export const FeatureFlag = DiscoveryService.createDecorator<string>();

// Export the metadata key so we can use it for discovery
// Note: The actual key is generated internally, but we can discover by using
// the decorator itself or by storing the key when needed
