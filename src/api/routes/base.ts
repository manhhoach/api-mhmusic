import { Router } from 'express'

export default abstract class BaseRoutes{
    private router = Router();
    protected path: string;
    protected abstract initializeRoutes(): void;
    public getRouter(): Router {
        return this.router;
    }
    public getPath(): string {
        return this.path;
    }

}

