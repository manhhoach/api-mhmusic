import express, { Request, Response, NextFunction } from "express"
import "reflect-metadata"
import { responseError } from './api/helpers/response'
import 'dotenv/config';
import IndexRouter from './api/routes'
import helmet from "helmet";
import compression from 'compression'
import cors from 'cors'

class App {
    public PORT: number;
    public app: express.Application;
    private Router: IndexRouter;

    constructor() {
        this.app = express()
        this.PORT = parseInt(process.env.PORT as string) || 3000
        this.Router = new IndexRouter();
        

        this.useMiddlewares()
        this.useRoutes()
        this.useErrorHandler()

    }
    private useMiddlewares() {
        this.app.use(helmet())
        this.app.use(compression())
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }
    private useErrorHandler() {
        this.app.use('*', (err: any, req: Request, res: Response, next: NextFunction) => {
            let message = err.message ? err.message : err;
            message = message ? message : err.detail;
            res.status(err.statusCode||500).json(responseError(message))
        })
    }
    private useRoutes() {
        this.app.use('/api', this.Router.getRouter())
        this.app.get('/', (req: Request, res: Response)=>{
            res.send('WELCOME TO API MHMUSIC')
        })
    }
    public listen(): void {
        this.app.listen(this.PORT, () => {
            console.log(`App listening on the port ${this.PORT}`);
        });
    }
}


export default App