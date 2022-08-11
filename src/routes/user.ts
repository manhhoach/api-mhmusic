import express, {Router} from 'express'
const router: Router = express.Router()
import * as userController from './../controllers/user'
import * as jwt from './../middlewares/jwt_token';

router.post('/register', userController.register); // done
router.post('/login', userController.login); // done
router.post('/forgot-password', userController.forgotPassword); //
router.put('/reset-password/:token', userController.resetPassword); //

router.use( jwt.decodeToken)
router.put('/change-password', userController.changePassword) // done
router.get('/me', userController.getMe); // done
router.put('/me', userController.updateMe); // done

router.use(jwt.protect);
router.delete('/:id', userController.destroy); // done

export default router