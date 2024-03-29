import { Permissions } from '@app/common';
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

export const PermissionGuard = (permission: Permissions): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request: any = context.switchToHttp().getRequest<Request>();
      const user = request.user;
      return user?.permissions.includes(permission);
    }
  }

  return mixin(PermissionGuardMixin);
};
