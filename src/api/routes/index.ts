import { Router } from 'express';
import UserRoutes from './user';


export default class IndexRouter {
    private router = Router();
    private routes: any[]

    constructor() {
        this.routes = [new UserRoutes()];
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
