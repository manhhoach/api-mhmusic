/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "singer";

export interface Empty {
}

export interface Singer {
  id: string;
  name: string;
  createdAt: string;
}

export interface FindByIdDto {
  id: string;
}

export interface FindAllDto {
  pageSize: number;
  pageIndex: number;
  order: string;
}

export interface CreateSingerDto {
  name: string;
}

export interface UpdateSingerDto {
  id: string;
  name: string;
}

export interface Singers {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  data: Singer[];
}

export const SINGER_PACKAGE_NAME = "singer";

export interface SingerServiceClient {
  create(request: CreateSingerDto): Observable<Singer>;

  findAll(request: FindAllDto): Observable<Singers>;

  findById(request: FindByIdDto): Observable<Singer>;

  update(request: UpdateSingerDto): Observable<Singer>;

  delete(request: FindByIdDto): Observable<Empty>;
}

export interface SingerServiceController {
  create(request: CreateSingerDto): Promise<Singer> | Observable<Singer> | Singer;

  findAll(request: FindAllDto): Promise<Singers> | Observable<Singers> | Singers;

  findById(request: FindByIdDto): Promise<Singer> | Observable<Singer> | Singer;

  update(request: UpdateSingerDto): Promise<Singer> | Observable<Singer> | Singer;

  delete(request: FindByIdDto): Promise<Empty> | Observable<Empty> | Empty;
}

export function SingerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findAll", "findById", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("SingerService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("SingerService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SINGER_SERVICE_NAME = "SingerService";
