import express, {Router} from 'express'
const router: Router = express.Router()
import * as likeController from './../controllers/like'
import * as jwt from './../middlewares/jwt_token';

router.get('/count',likeController.countLike )

router.use(jwt.decodeToken);
router.post('/', likeController.create); // done
router.delete('/', likeController.destroy); // done


export default router