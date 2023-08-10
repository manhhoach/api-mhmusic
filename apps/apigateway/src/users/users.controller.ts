import { USER_SERVICE_NAME, UserServiceClient } from '@app/common';
import { Body, Controller, Get, Inject, Injectable, OnModuleInit, Patch, Request, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from './../auth/auth.guard';
import { lastValueFrom } from 'rxjs';


@Injectable()
@Controller('users')
export class UsersController implements OnModuleInit {
    private usersService: UserServiceClient;
    constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) { }

    onModuleInit() {
        this.usersService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
    }
    
    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Request() req) {
        return req.user;
    }

    @Patch('profile')
    @UseGuards(AuthGuard)
    async updateProfile(@Request() req, @Body() data) {
        try{
            let user = await lastValueFrom(this.usersService.updateUser({id: req.user.id, ...data}))
            return user
        }
        catch(err){
            console.log('errr', err);
            
        }
        
    }
}
