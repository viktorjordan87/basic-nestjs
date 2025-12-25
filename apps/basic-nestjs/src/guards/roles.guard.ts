import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';
import { createVerifier } from 'fast-jwt';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorators/roles.decorator';

// JWT Payload interface
interface JwtPayload {
  [key: string]: unknown;
}

// Extended Request type with user property
interface RequestWithUser extends Request {
  user?: {
    role?: string;
    [key: string]: unknown;
  };
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  private readonly verifier = createVerifier({
    key:
      process.env.JWT_SECRET ||
      'G8CiCcUfkdwn_ivnlpbrQHqym2cWKWxiVbEKiyf9MleZupPdrNEj6XNYLMxWiPOkQLANJ3kgF94j2YCYIvFoAQ',
    algorithms: ['HS256'], // Specify the algorithm (default is HS256)
  });

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    //attached to the decorator @Roles(['admin', 'user'])
    const allowedRoles = this.reflector.get(Roles, context.getHandler());
    //if no roles are attached to the decorator, return true, means no restriction on the route
    if (!allowedRoles) {
      return true;
    }
    return this.validateRole(request, allowedRoles);
  }

  private validateRole(
    request: RequestWithUser,
    allowedRoles: string[],
  ): boolean {
    // Check for authorization header
    const authHeader = request.headers?.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Authorization header is missing');
    }

    // Extract token from "Bearer <token>"
    const token = String(authHeader).replace('Bearer ', '').trim();

    if (!token || token === 'undefined') {
      throw new UnauthorizedException('Invalid token');
    }

    try {
      // Verify and parse JWT token
      const payload = this.verifier(token) as JwtPayload;

      // Attach user data to request object for use in controllers/services
      request.user = payload.user as { [key: string]: unknown };
    } catch (error: unknown) {
      // Handle specific JWT errors
      if (error && typeof error === 'object' && 'code' in error) {
        const jwtError = error as { code: string; message?: string };

        if (jwtError.code === 'FAST_JWT_INVALID_SIGNATURE') {
          throw new UnauthorizedException(
            'Token signature is invalid. The token may have been signed with a different secret key.',
          );
        }

        if (jwtError.code === 'FAST_JWT_EXPIRED') {
          throw new UnauthorizedException('Token has expired');
        }

        if (jwtError.code === 'FAST_JWT_MALFORMED') {
          throw new UnauthorizedException('Token is malformed');
        }
      }

      // Generic error fallback
      throw new UnauthorizedException('Invalid or expired token');
    }

    // Role-based access control - check after successful JWT verification
    if (!allowedRoles.includes(request?.user?.role as string)) {
      throw new ForbiddenException(
        'You are not authorized to access this resource',
      );
    }

    return true;
  }
}
