/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "album";

export interface Empty {
}

export interface Album {
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

export interface CreateAlbumDto {
  name: string;
}

export interface UpdateAlbumDto {
  id: string;
  name: string;
}

export interface Albums {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  data: Album[];
}

export const ALBUM_PACKAGE_NAME = "album";

export interface AlbumServiceClient {
  createAlbum(request: CreateAlbumDto): Observable<Album>;

  findAll(request: FindAllDto): Observable<Albums>;

  findById(request: FindByIdDto): Observable<Album>;

  updateAlbum(request: UpdateAlbumDto): Observable<Album>;

  deleteAlbum(request: FindByIdDto): Observable<Empty>;
}

export interface AlbumServiceController {
  createAlbum(request: CreateAlbumDto): Promise<Album> | Observable<Album> | Album;

  findAll(request: FindAllDto): Promise<Albums> | Observable<Albums> | Albums;

  findById(request: FindByIdDto): Promise<Album> | Observable<Album> | Album;

  updateAlbum(request: UpdateAlbumDto): Promise<Album> | Observable<Album> | Album;

  deleteAlbum(request: FindByIdDto): Promise<Empty> | Observable<Empty> | Empty;
}

export function AlbumServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createAlbum", "findAll", "findById", "updateAlbum", "deleteAlbum"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("AlbumService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("AlbumService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ALBUM_SERVICE_NAME = "AlbumService";
