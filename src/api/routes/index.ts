import { Router } from 'express';
import UserRoutes from './user';
import SingerRoutes from './singer';
import SongRoutes from './song';
import AlbumRoutes from './album';
import AlbumSongRoutes from './album_song';

export default class IndexRouter {
    private router = Router();
    private routes: any[];
    constructor() {
        this.routes = [SingerRoutes, AlbumRoutes, AlbumSongRoutes, SongRoutes, UserRoutes];
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.routes.forEach(route => {
            let routeElement = route.initRoutes();  
            this.router.use(routeElement.getPath(), routeElement.getRouter());
        });

    }

    public getRouter(): Router {
        return this.router;
    }
}
