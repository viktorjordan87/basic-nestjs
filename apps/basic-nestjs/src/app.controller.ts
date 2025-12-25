import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SmartTransformationPipe } from './pipes/transformation';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { generateUserToken } from './utils/jwt.util';
import { Roles } from './decorators/roles.decorator';
import { LoggingInterceptor, TimeoutInterceptor } from './interceptors';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { User, UserObjectValue } from './decorators';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  //testing the parse int pipe
  @Get('random-number/:number')
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  @UseInterceptors(LoggingInterceptor)
  getRandomNumber(@Param('number', ParseIntPipe) number: number): number {
    return Math.floor(Math.random() * 100) * number;
  }

  //testing the parse int pipe
  @UseGuards(AuthGuard)
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

  // Generate JWT token
  @Get('generate-token')
  generateToken(
    @Query('role') role: 'admin' | 'user' | 'guest' = 'user',
    @Query('userId') userId: string,
  ): { token: string; payload: unknown } {
    if (!userId) {
      throw new BadRequestException('userId query parameter is required');
    }

    const token = generateUserToken(role, userId);

    // Decode token to show payload (without verification, just for display)
    const payload = JSON.parse(
      Buffer.from(token.split('.')[1], 'base64').toString(),
    ) as unknown;

    return {
      token,
      payload,
    };
  }

  //test timeout interceptor
  @Get('timeout')
  @UseInterceptors(TimeoutInterceptor)
  async timeout(): Promise<Observable<string>> {
    await new Promise((resolve) => setTimeout(resolve, 4000)); // test > 5000ms
    return of('Hello, world!');
  }

  //test user decorator
  @Get('user-info')
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  getUserInfo(@User() user: { role: string }): { role: string } {
    return user;
  }

  //user id
  @Get('user-id')
  @Roles(['admin'])
  @UseGuards(RolesGuard)
  getUserId(@UserObjectValue('id') userId: string): string {
    return userId;
  }
}
