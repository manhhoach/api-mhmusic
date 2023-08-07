import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';


import { Request } from 'express';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            let user = await this.authService.verifyToken(token)
            console.log(user);
            
            request.user = user;
        } catch (err) {
            throw err;
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}