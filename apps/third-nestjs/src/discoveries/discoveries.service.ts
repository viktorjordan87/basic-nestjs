import { Injectable, OnModuleInit, Controller } from '@nestjs/common';
import { CreateDiscoveryDto } from './dto/create-discovery.dto';
import { UpdateDiscoveryDto } from './dto/update-discovery.dto';
import { DiscoveryService, Reflector } from '@nestjs/core';
import { FeatureFlag } from '../decorators/feature-flag.decorator';
import 'reflect-metadata';

@Injectable()
export class DiscoveriesService implements OnModuleInit {
  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly reflector: Reflector,
  ) {}

  onModuleInit() {
    // Example: Get all providers in the application
    // const providers = this.discoveryService.getProviders();
    // console.log('Total providers:', providers.length);
    // // Example: Get all controllers
    // const controllers = this.discoveryService.getControllers();
    // console.log('Total controllers:', controllers.length);
    // Example: Get providers with instances
    // const providersWithInstances = this.discoveryService
    //   .getProviders()
    //   .filter((wrapper) => wrapper.instance);
    // console.log('Providers with instances:', providersWithInstances.length);
    // // Example: Get providers by metadata key
    // const providersWithMetadata = this.discoveryService
    //   .getProviders({ metadataKey: 'path' })
    //   .filter((wrapper) => wrapper.instance);
    // console.log('Providers with path metadata:', providersWithMetadata.length);
  }

  /**
   * Get all providers discovered in the application
   */
  getAllProviders() {
    const providers = this.discoveryService.getProviders();
    return providers.map((wrapper) => ({
      name: wrapper.name,
      metatype: wrapper.metatype?.name,
      instance: wrapper.instance ? 'initialized' : 'not initialized',
    }));
  }

  /**
   * Get all controllers discovered in the application
   */
  getAllControllers() {
    const controllers = this.discoveryService.getControllers();
    return controllers.map((wrapper) => ({
      name: wrapper.name,
      metatype: wrapper.metatype?.name,
      instance: wrapper.instance ? 'initialized' : 'not initialized',
    }));
  }

  /**
   * Get all providers with instances
   */
  getInstances() {
    const providersWithInstances = this.discoveryService
      .getProviders()
      .filter((wrapper) => wrapper.instance);
    return providersWithInstances.map((wrapper) => ({
      name: wrapper.name,
      metatype: wrapper.metatype?.name,
      instanceType: wrapper.instance?.constructor?.name || 'unknown',
      hasInstance: !!wrapper.instance,
    }));
  }

  /* Get all feature flags */
  getFeatureFlags() {
    const controllers = this.discoveryService.getControllers();
    const featureFlags: Array<{
      controller: string;
      method: string;
      featureFlag: string | null;
    }> = [];

    controllers.forEach((controller) => {
      if (!controller.metatype) return;

      const controllerName = controller.metatype.name;
      const prototype = controller.metatype.prototype;

      // Get all method names from the controller
      const methodNames = Object.getOwnPropertyNames(prototype).filter(
        (name) =>
          name !== 'constructor' && typeof prototype[name] === 'function',
      );

      methodNames.forEach((methodName) => {
        const method = prototype[methodName] as Function;

        // Try using Reflector to get metadata (works with both Reflector and DiscoveryService decorators)
        const featureFlag = this.reflector.get<string>(FeatureFlag, method);

        if (featureFlag !== undefined) {
          featureFlags.push({
            controller: controllerName,
            method: methodName,
            featureFlag: featureFlag || null,
          });
        }
      });
    });

    return featureFlags;
  }

  /**
   * Find controllers by metadata key
   */
  findControllersByMetadata(metadataKey: string) {
    return this.discoveryService
      .getControllers({ metadataKey })
      .map((wrapper) => ({
        name: wrapper.name,
        metatype: wrapper.metatype?.name,
        hasInstance: !!wrapper.instance,
      }));
  }

  create(createDiscoveryDto: CreateDiscoveryDto) {
    return 'This action adds a new discovery';
  }

  findAll() {
    return {
      message: 'Discovery Service Examples',
      providers: this.getAllProviders(),
      controllers: this.getAllControllers(),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} discovery`;
  }

  update(id: number, updateDiscoveryDto: UpdateDiscoveryDto) {
    return `This action updates a #${id} discovery`;
  }

  remove(id: number) {
    return `This action removes a #${id} discovery`;
  }
}
