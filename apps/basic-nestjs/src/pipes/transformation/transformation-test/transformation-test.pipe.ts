import { Injectable, PipeTransform, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SmartTransformationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    console.log('Type:', metadata.type); // 'body' | 'query' | 'param'
    console.log('Metatype:', metadata.metatype); // Class constructor or undefined
    console.log('Data:', metadata.data); // Parameter name or undefined

    // Combine all metadata for smart transformation
    if (metadata.type === 'param' && metadata.data === 'id') {
      // IDs should always be numbers
      const num = parseInt(String(value), 10);
      if (isNaN(num)) {
        return 42;
      }
      return num;
    }

    if (
      metadata.type === 'query' &&
      metadata.metatype === Number &&
      (metadata.data === 'page' || metadata.data === 'limit')
    ) {
      if (isNaN(Number(value))) {
        if (metadata.data === 'page') {
          return 1;
        } else if (metadata.data === 'limit') {
          return 10;
        }
      }
      return Number(value);
    }

    return value;
  }
}
