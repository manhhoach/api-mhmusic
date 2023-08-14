import { MESSAGES } from '@app/common';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from './../auth/auth.guard';
import { USER_SERVICE_NAME, UserServiceClient } from '@app/common/proto/user';
import { responseSucess, responseError } from '@app/common';

@Injectable()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController implements OnModuleInit {
  private usersService: UserServiceClient;
  constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.usersService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
    // try {
    // return responseSucess(HttpStatus.OK, req.user);
    //   }
    //  catch (error) {
    //      return responseError(error);
    //  }
  }

  @Patch('profile')
  async updateProfile(@Request() req, @Body() data: { name: string }) {
    try {
      const user = await this.usersService
        .updateUser({ id: req.user.id, ...data })
        .toPromise();
      return user;
      // return responseSucess(HttpStatus.OK, user)
    } catch (err) {
      throw new BadRequestException(err.details);
    }
  }

  @Patch('change-password')
  async changePassword(@Request() req, @Body() data: any) {
    try {
      const changePassUserDto = { id: req.user.id, ...data };
      return this.usersService.changePassword(changePassUserDto).toPromise();
      // return responseSucess(HttpStatus.OK)
    } catch (err) {
      if (err.details === MESSAGES.INCORRECT_PASSWORD)
        throw new BadRequestException(MESSAGES.INCORRECT_PASSWORD);
      throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);
    }
  }
}
