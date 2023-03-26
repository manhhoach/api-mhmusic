import { Router } from 'express'
import AuthJwt from './../middlewares/jwt';


export default abstract class BaseRoutes{

    private router = Router();
    protected abstract path: string;
    protected abstract initializeRoutes(): void;

    constructor(protected authJwt: AuthJwt){}
    
    public getRouter(): Router {
        return this.router;
    }
    public getPath(): string {
        return this.path;
    }
}

