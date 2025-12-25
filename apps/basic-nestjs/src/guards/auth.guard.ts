import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    return this.validateRequest(request);
  }

  private validateRequest(request: Request): boolean {
    // Example: Check for authorization header
    const authHeader = request.headers?.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    // Example: Basic token validation
    // In a real app, you would verify JWT tokens, session tokens, etc.
    const token = String(authHeader).replace('Bearer ', '');

    if (!token || token === 'undefined' || token !== 'titok') {
      throw new UnauthorizedException('Invalid token');
    }

    // Add your authentication logic here
    // For example: verify JWT, check session, etc.

    return true;
  }
}
