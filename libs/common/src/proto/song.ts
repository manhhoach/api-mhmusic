/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "song";

export interface Singer {
  id: string;
  name: string;
  createdAt: string;
}

export interface Song {
  id: string;
  name: string;
  url: string;
  view: number;
  createdAt: string;
  singer: Singer | undefined;
}

export interface Songs {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  data: Song[];
}

export interface Empty {
}

export interface FindByIdDto {
  id: string;
}

export interface FindAllDto {
  pageSize: number;
  pageIndex: number;
  order: string;
}

export interface CreateSongDto {
  name: string;
  url: string;
  singer: string;
}

export interface UpdateSongDto {
  id: string;
  name: string;
  url: string;
  singer: string;
}

export const SONG_PACKAGE_NAME = "song";

export interface SongServiceClient {
  createSong(request: CreateSongDto): Observable<Song>;

  findAll(request: FindAllDto): Observable<Songs>;

  findById(request: FindByIdDto): Observable<Song>;

  updateSong(request: UpdateSongDto): Observable<Song>;

  deleteSong(request: FindByIdDto): Observable<Empty>;
}

export interface SongServiceController {
  createSong(request: CreateSongDto): Promise<Song> | Observable<Song> | Song;

  findAll(request: FindAllDto): Promise<Songs> | Observable<Songs> | Songs;

  findById(request: FindByIdDto): Promise<Song> | Observable<Song> | Song;

  updateSong(request: UpdateSongDto): Promise<Song> | Observable<Song> | Song;

  deleteSong(request: FindByIdDto): Promise<Empty> | Observable<Empty> | Empty;
}

export function SongServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["createSong", "findAll", "findById", "updateSong", "deleteSong"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("SongService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("SongService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const SONG_SERVICE_NAME = "SongService";
