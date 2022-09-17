import express, {Router} from 'express'
const router: Router = express.Router()
import * as likeController from './../controllers/like'
import * as jwt from './../middlewares/jwt_token';

router.get('/count',likeController.countLike )

router.use(jwt.decodeToken);
router.get('/liked',likeController.getLiked)
router.post('/', likeController.create);
router.delete('/', likeController.destroy);


export default router