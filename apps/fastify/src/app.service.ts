import { Injectable } from '@nestjs/common';
import type { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class AppService {
  getHello(): { json: string } {
    const baseText =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ' +
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ' +
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    // Repeat the base text to produce a multi‑KB response body for compression testing
    const bigText = Array.from({ length: 50 }, () => baseText).join(' ');

    return {
      json: bigText,
    };
  }

  getCookie(request: FastifyRequest, response: FastifyReply) {
    const cookies = request.cookies;

    response.cookie('test-fastify-unsigned', 'test-fastify-unsigned-value', { httpOnly: true, secure: true, maxAge: 1000 * 5, signed: false });
    response.cookie('test-fastify-signed', 'test-fastify-signed-value', { httpOnly: true, secure: true, maxAge: 1000 * 5, signed: true });
    // In Fastify, signed cookies are in request.cookies but need to be unsigned with request.unsignCookie()
    const unsignedCookieValue = cookies['test-fastify-unsigned'];
    const signedCookieValue = cookies['test-fastify-signed'];
    const unsignedSignedCookieValue = signedCookieValue ? request.unsignCookie(signedCookieValue) : null;
    console.log(unsignedSignedCookieValue);
    return `
    cookies ${JSON.stringify(cookies)} 
    unsigned cookie: 'test-fastify-unsigned' => ${unsignedCookieValue || 'N/A'}
    signed cookie: 'test-fastify-signed' => ${signedCookieValue || 'N/A'} => ${unsignedSignedCookieValue?.value || 'N/A'} `;
  }
}
