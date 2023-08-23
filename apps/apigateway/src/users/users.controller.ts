import { MESSAGES, responseSucess, tryCatchHttpException } from '@app/common';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
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
import { lastValueFrom } from 'rxjs';

@Injectable()
@UseGuards(AuthGuard)
@Controller('users')
export class UsersController implements OnModuleInit {
  private usersService: UserServiceClient;
  constructor(@Inject(USER_SERVICE_NAME) private client: ClientGrpc) { }

  onModuleInit() {
    this.usersService =
      this.client.getService<UserServiceClient>(USER_SERVICE_NAME);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return responseSucess(HttpStatus.OK, req.user)
  }

  @Patch('profile')
  async updateProfile(@Request() req, @Body() data: { name: string }) {
    // try {
    //   const user = await lastValueFrom(this.usersService.update({ id: req.user.id, ...data }))
    //   return user;
    // } catch (err) {
    //   throw new BadRequestException(err.details);
    // }
    return tryCatchHttpException(this.usersService.update({ id: req.user.id, ...data }), HttpStatus.OK)
  }

  @Patch('change-password')
  async changePassword(@Request() req, @Body() data: any) {
    // try {
    //   const changePassUserDto = { id: req.user.id, ...data };
    //   return lastValueFrom(this.usersService.changePassword(changePassUserDto));
    // } catch (err) {
    //   if (err.details === MESSAGES.INCORRECT_PASSWORD)
    //     throw new BadRequestException(MESSAGES.INCORRECT_PASSWORD);
    //   throw new NotFoundException(MESSAGES.EMAIL_NOT_FOUND);
    // }

    return tryCatchHttpException(this.usersService.changePassword({ id: req.user.id, ...data }), HttpStatus.OK)
  }
}
