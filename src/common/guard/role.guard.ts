import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Roles } from '../decorator/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRoles: string[]): boolean {
    if (!userRoles || userRoles.length === 0) {
      return false;
    }
    if (!roles || roles.length === 0) {
      return true;
    }
    return roles.some((role) => userRoles.includes(role));
  }

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());
    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // throw new UnauthorizedException('Unauthorized');
    return true;
    return this.matchRoles(roles, user?.roles);
  }
}
