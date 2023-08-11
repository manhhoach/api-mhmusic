import { MESSAGES, } from '@app/common';
import { BadRequestException, Body, Controller, Get, HttpStatus, Inject, Injectable, NotFoundException, OnModuleInit, Patch, Request, UseGuards } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from './../auth/auth.guard';
import { USER_SERVICE_NAME, UserServiceClient } from '@app/common/proto/user';
import { responseSucess, responseError } from '../helpers/response';

@Injectable()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController implements OnModuleInit {
    private usersService: UserServiceClient;
    constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) { }

    onModuleInit() {
        this.usersService = this.client.getService<UserServiceClient>(USER_SERVICE_NAME)
    }

    @Get('profile')
    getProfile(@Request() req) {
        // return req.user
        // try {
        return responseSucess(HttpStatus.OK, req.user);
        //   }
        //  catch (error) {
        //      return responseError(error);
        //  }
    }

    @Patch('profile')
    async updateProfile(@Request() req, @Body() data: { name: string }) {
        try {
            let user = await this.usersService.updateUser({ id: req.user.id, ...data }).toPromise()
            //  return user
            return responseSucess(HttpStatus.OK, user)
        }
        catch (err) {
            // return 
            throw new BadRequestException(err.details)
        }
    }

    @Patch('change-password')
    async changePassword(@Request() req, @Body() data: any) {
        try {
            let changePassUserDto = { id: req.user.id, ...data }
            await this.usersService.changePassword(changePassUserDto).toPromise()
            return responseSucess(HttpStatus.OK)
        }
        catch (err) {
            if (err.details === MESSAGES.INCORRECT_PASSWORD)
                throw new BadRequestException(MESSAGES.INCORRECT_PASSWORD)
            throw new NotFoundException(MESSAGES.NOT_FOUND)
        }
    }
}
