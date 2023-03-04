import { Router } from 'express'
import UserController from './../controllers/user'

export default class UserRoutes{
    private router = Router();
    private userController=new UserController();
    constructor(){
        this.initializeRoutes()
    }
    private initializeRoutes(): void{
        this.router.get('/me', this.userController.getMe)
        this.router.post('/register', this.userController.register)
    }

    public getRouter():Router{
        return this.router;
    }

}

// const router = Router();

// router.post('/register', userController.register)
// router.post('/login', userController.login)

// router.use(checkJwt.checkToken)
// router.get('/', userController.getMe)
// router.patch('/', userController.updateMe)
// router.patch('/change-password', userController.changePassword)
