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
  type: number;
}

export interface ChangePasswordDto {
  name: string;
  type: number;
}

export interface Users {
  users: User[];
}

export const USER_PACKAGE_NAME = "user";

export interface UserServiceClient {
  createUser(request: CreateUserDto): Observable<User>;

  findByEmail(request: FindByEmailDto): Observable<User>;

  findById(request: FindByIdDto): Observable<User>;

  updateUser(request: UpdateUserDto): Observable<User>;

  changePassword(request: ChangePasswordDto): Observable<Empty>;
}

export interface UserServiceController {
  createUser(request: CreateUserDto): Promise<User> | Observable<User> | User;

  findByEmail(request: FindByEmailDto): Promise<User> | Observable<User> | User;

  findById(request: FindByIdDto): Promise<User> | Observable<User> | User;

  updateUser(request: UpdateUserDto): Promise<User> | Observable<User> | User;

  changePassword(request: ChangePasswordDto): Promise<Empty> | Observable<Empty> | Empty;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createUser", "findByEmail", "findById", "updateUser", "changePassword"];
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
