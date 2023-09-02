import { responseSucess, tryCatchHttpException } from '@app/common';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Injectable,
  OnModuleInit,
  Patch,
  Request,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { USER_SERVICE_NAME, UserServiceClient } from '@app/common/proto/user';

@Injectable()
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
    return responseSucess(HttpStatus.OK, req.user);
  }

  @Patch('profile')
  async updateProfile(@Request() req, @Body() data: { name: string }) {
    return tryCatchHttpException(
      this.usersService.update({ id: req.user.id, ...data }),
      HttpStatus.OK,
    );
  }

  @Patch('change-password')
  async changePassword(@Request() req, @Body() data: any) {
    return tryCatchHttpException(
      this.usersService.changePassword({ id: req.user.id, ...data }),
      HttpStatus.OK,
    );
  }

  @Patch('upgrade-to-admin')
  async upgradeToAdmin(@Request() req){
    return tryCatchHttpException(
      this.usersService.upgradeToAdmin({ id: req.user.id }),
      HttpStatus.OK,
    ); 
  }
}
