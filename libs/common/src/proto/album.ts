/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "album";

export interface AddSongDto {
  albumId: string;
  songId: string;
}

export interface RemoveSongDto {
  albumSongId: string;
}

export interface Song {
  id: string;
  name: string;
  url: string;
  views: number;
  createdAt: string;
  albumSongId: string;
}

export interface SongsInAlbum {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  data: Song[];
}

export interface FindDetailDto {
  albumId: string;
  pageSize: number;
  pageIndex: number;
}

export interface Album {
  id: string;
  name: string;
  createdAt: string;
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

export interface Empty {
}

export interface FindByIdDto {
  id: string;
}

export const ALBUM_PACKAGE_NAME = "album";

export interface AlbumServiceClient {
  create(request: CreateAlbumDto): Observable<Album>;

  findAll(request: FindAllDto): Observable<Albums>;

  update(request: UpdateAlbumDto): Observable<Album>;

  delete(request: FindByIdDto): Observable<Empty>;

  findSongsInAlbum(request: FindDetailDto): Observable<SongsInAlbum>;

  addSongInAlbum(request: AddSongDto): Observable<Empty>;

  removeSongInAlbum(request: RemoveSongDto): Observable<Empty>;
}

export interface AlbumServiceController {
  create(request: CreateAlbumDto): Promise<Album> | Observable<Album> | Album;

  findAll(request: FindAllDto): Promise<Albums> | Observable<Albums> | Albums;

  update(request: UpdateAlbumDto): Promise<Album> | Observable<Album> | Album;

  delete(request: FindByIdDto): Promise<Empty> | Observable<Empty> | Empty;

  findSongsInAlbum(request: FindDetailDto): Promise<SongsInAlbum> | Observable<SongsInAlbum> | SongsInAlbum;

  addSongInAlbum(request: AddSongDto): Promise<Empty> | Observable<Empty> | Empty;

  removeSongInAlbum(request: RemoveSongDto): Promise<Empty> | Observable<Empty> | Empty;
}

export function AlbumServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "create",
      "findAll",
      "update",
      "delete",
      "findSongsInAlbum",
      "addSongInAlbum",
      "removeSongInAlbum",
    ];
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
