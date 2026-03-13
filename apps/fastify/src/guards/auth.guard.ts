import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from "../decorators";


@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private readonly jwtService: JwtService, private readonly reflector: Reflector) { }


    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if (isPublic) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const header = request.headers.authorization?.split(' ');
        const token = header?.at(1);
        const type = header?.at(0);

        if (!token || type !== 'Bearer') {
            throw new UnauthorizedException('Invalid token');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token);
            request.user = {
                sub: payload.sub,
                username: payload.username,
                roles: payload.roles,
            };
            return true;
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('Token expired');
            }
            if (error instanceof JsonWebTokenError) {
                throw new UnauthorizedException('Invalid token');
            }
            throw new UnauthorizedException('Authentication failed');
        }


    }
}