import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
// import { ROLES_KEY } from 'src/decorators/permissions.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    // const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
    //   context.getClass(),
    //   context.getHandler(),
    // ]);

    // const userRole = request.user.role;

    // let authorizedUser = true;

    // requiredRoles.forEach((role: string) => {
    //   if (role !== userRole) {
    //     authorizedUser = false;
    //   }
    // });

    // return authorizedUser;
    return;
  }
}
