import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "../decorators/roles.decorator";
import { Role } from "../auth/auth.roles";


@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const hasRole = requiredRoles.some(role => request.user.roles.includes(role));
        if (!hasRole) {
            throw new ForbiddenException('You are not authorized to access this resource');
        }
        return true;
    }
}