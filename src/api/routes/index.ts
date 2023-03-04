import { Router } from 'express';
import UserRoutes from './user';

export default class IndexRouter {
    private router = Router();
    private userRoutes = new UserRoutes();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes() {
        this.router.use('/users', this.userRoutes.getRouter());
    }

    public getRouter(): Router {
        return this.router;
    }
}
