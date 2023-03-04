import express, { Request, Response, NextFunction } from "express"
import "reflect-metadata"
import { responseError } from './api/helpers/response'
import 'dotenv/config';
import IndexRouter from './api/routes'

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
    useMiddlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
    }
    useErrorHandler() {
        this.app.use('*', (err: any, req: Request, res: Response, next: NextFunction) => {
            console.log(err);
            res.json(responseError(err))
        })
    }
    useRoutes() {
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