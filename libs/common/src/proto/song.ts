/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "song";

export interface Chart {
  data: ElementChart[];
}

export interface ElementChart {
  time: string;
  hourlyViews: HourlyViews | undefined;
}

export interface HourlyViews {
  id: string;
  name: string;
  percentViews: number;
}

export interface Singer {
  id: string;
  name: string;
}

export interface Song {
  id: string;
  name: string;
  url: string;
  views: number;
  createdAt: string;
}

export interface SongInfo {
  id: string;
  name: string;
  url: string;
  views: number;
  createdAt: string;
  singer: Singer | undefined;
}

export interface SongInfos {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  data: SongInfo[];
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
  create(request: CreateSongDto): Observable<Song>;

  findAll(request: FindAllDto): Observable<SongInfos>;

  findById(request: FindByIdDto): Observable<SongInfo>;

  update(request: UpdateSongDto): Observable<SongInfo>;

  delete(request: FindByIdDto): Observable<Empty>;

  increViews(request: FindByIdDto): Observable<Empty>;

  getChart(request: Empty): Observable<Chart>;
}

export interface SongServiceController {
  create(request: CreateSongDto): Promise<Song> | Observable<Song> | Song;

  findAll(request: FindAllDto): Promise<SongInfos> | Observable<SongInfos> | SongInfos;

  findById(request: FindByIdDto): Promise<SongInfo> | Observable<SongInfo> | SongInfo;

  update(request: UpdateSongDto): Promise<SongInfo> | Observable<SongInfo> | SongInfo;

  delete(request: FindByIdDto): Promise<Empty> | Observable<Empty> | Empty;

  increViews(request: FindByIdDto): Promise<Empty> | Observable<Empty> | Empty;

  getChart(request: Empty): Promise<Chart> | Observable<Chart> | Chart;
}

export function SongServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["create", "findAll", "findById", "update", "delete", "increViews", "getChart"];
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
