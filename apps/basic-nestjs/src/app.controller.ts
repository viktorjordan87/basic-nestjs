import {
  Controller,
  Get,
  Post,
  HttpStatus,
  Param,
  Query,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SmartTransformationPipe } from './pipes/transformation';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //testing the parse int pipe
  @Get('random-number/:number')
  getRandomNumber(@Param('number', ParseIntPipe) number: number): number {
    return Math.floor(Math.random() * 100) * number;
  }

  //testing the parse int pipe
  @Get('random-number-2/:number')
  getRandomNumber2(
    @Param(
      'number',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    number: number,
  ): number {
    return Math.floor(Math.random() * 100) * number;
  }

  // Testing transformation pipe with @Param('id') - converts to number
  @Get('user/:id')
  getUser(@Param('id', SmartTransformationPipe) id: number): { id: number } {
    return { id };
  }

  // Testing transformation pipe with @Query - converts to number
  @Get('search')
  search(
    @Query('page', SmartTransformationPipe) page: number,
    @Query('limit', SmartTransformationPipe) limit: number,
  ): { page: number; limit: number } {
    return { page, limit };
  }
}
