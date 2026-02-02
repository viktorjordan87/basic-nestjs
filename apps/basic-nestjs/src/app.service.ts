import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) { }

  getHello(): string {
    return `Hello World Jordan! ${this.configService.get('APP_NAME')}`;
  }

  getCookie(request: Request, response: Response) {
    const cookies = request.cookies;

    response.cookie('test-express-unsigned', 'test-express-unsigned-value', { httpOnly: true, secure: true, maxAge: 1000 * 5, signed: false });
    response.cookie('test-express-signed', 'test-express-signed-value', { httpOnly: true, secure: true, maxAge: 1000 * 5, signed: true });
    // In Express, cookie-parser removes valid signed cookies from request.cookies and puts them in request.signedCookies
    // To get the raw signed value, we need to parse the cookie header manually
    const unsignedCookieValue = cookies['test-express-unsigned'];
    const signedCookieUnsignedValue = request.signedCookies['test-express-signed']; // Unsigned/decoded value

    // Parse raw cookie header to get the signed cookie value
    const rawCookieHeader = request.headers.cookie || '';
    const cookieMatch = rawCookieHeader.match(/test-express-signed=([^;]+)/);
    const signedCookieRawValue = cookieMatch ? cookieMatch[1] : null;

    console.log({ unsignedCookieValue, signedCookieRawValue, signedCookieUnsignedValue });
    response.send(`
    cookies ${JSON.stringify(cookies)} 
    signedCookies ${JSON.stringify(request.signedCookies)}
    unsigned cookie: 'test-express-unsigned' => ${unsignedCookieValue || 'N/A'}
    signed cookie: 'test-express-signed' => ${signedCookieRawValue || 'N/A'} => ${signedCookieUnsignedValue || 'N/A'} `);
  }
}
