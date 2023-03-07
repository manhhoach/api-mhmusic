import { Router } from 'express';
import UserRoutes from './user';
import SingerRoutes from './singer'


export default class IndexRouter {
    private router = Router();
    private routes: any[]

    constructor() {
        this.routes = [new UserRoutes(), new SingerRoutes()];
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.routes.forEach(route => {
            this.router.use(route.path, route.getRouter());
        })

    }

    public getRouter(): Router {
        return this.router;
    }
}
