/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "user";

export interface Empty {
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  type: number;
}

export interface FindByIdDto {
  id: string;
}

export interface FindByEmailDto {
  email: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserDto {
  id: string;
  name: string;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
  id: string;
}

export interface Users {
  users: User[];
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  create(request: CreateUserDto): Observable<User>;

  findByEmail(request: FindByEmailDto): Observable<User>;

  findById(request: FindByIdDto): Observable<User>;

  update(request: UpdateUserDto): Observable<User>;

  changePassword(request: ChangePasswordDto): Observable<Empty>;
}

export interface UserServiceController {
  create(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findByEmail(request: FindByEmailDto): Promise<User> | Observable<User> | User;

  findById(request: FindByIdDto): Promise<User> | Observable<User> | User;

  update(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  changePassword(request: ChangePasswordDto): Promise<Empty> | Observable<Empty> | Empty;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findByEmail", "findById", "update", "changePassword"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
