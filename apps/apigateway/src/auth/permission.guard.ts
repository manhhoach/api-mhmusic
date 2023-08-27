import Permission from '@app/common'
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
 
export const PermissionGuard = (permission: Permission): Type<CanActivate> => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request: any = context.switchToHttp().getRequest<Request>();
      const user = request.user;
      console.log(user);
      
      return user?.permissions.includes(permission);
    }
  }
 
  return mixin(PermissionGuardMixin);
}