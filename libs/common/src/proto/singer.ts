/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "singer";

export interface Empty {
}

export interface Singer {
  id: string;
  name: string;
  createdAt: number;
}

export interface FindByIdDto {
  id: string;
}

export interface FindAllDto {
  pageSize: number;
  pageIndex: number;
  order: string;
  name: string;
}

export interface CreateSingerDto {
  name: string;
}

export interface UpdateSingerDto {
  id: string;
  name: string;
}

export interface Singers {
  singers: Singer[];
}

export const SINGER_PACKAGE_NAME = "singer";

export interface SingerServiceClient {
  createSinger(request: CreateSingerDto): Observable<Singer>;

  findAll(request: FindAllDto): Observable<Singers>;

  findById(request: FindByIdDto): Observable<Singer>;

  updateSinger(request: UpdateSingerDto): Observable<Singer>;

  deleteSinger(request: FindByIdDto): Observable<Empty>;
}

export interface SingerServiceController {
  createSinger(request: CreateSingerDto): Promise<Singer> | Observable<Singer> | Singer;

  findAll(request: FindAllDto): Promise<Singers> | Observable<Singers> | Singers;

  findById(request: FindByIdDto): Promise<Singer> | Observable<Singer> | Singer;

  updateSinger(request: UpdateSingerDto): Promise<Singer> | Observable<Singer> | Singer;

  deleteSinger(request: FindByIdDto): Promise<Empty> | Observable<Empty> | Empty;
}

export function SingerServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createSinger", "findAll", "findById", "updateSinger", "deleteSinger"];
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
