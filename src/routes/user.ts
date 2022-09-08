import express, {Router} from 'express'
const router: Router = express.Router()
import * as userController from './../controllers/user'
import * as jwt from './../middlewares/jwt_token';

router.post('/register', userController.register);
router.post('/login', userController.login);
router.post('/forgot-password', userController.forgotPassword);
router.put('/reset-password/:token', userController.resetPassword); 

router.use( jwt.decodeToken)
router.put('/recent-songs', userController.updateRecentSongs);
router.put('/change-password', userController.changePassword)
router.get('/me', userController.getMe);
router.put('/me', userController.updateMe);

router.use(jwt.protect);
router.delete('/:id', userController.destroy);

export default router