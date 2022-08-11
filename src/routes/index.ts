import express, {Router} from 'express'
const router: Router = express.Router()

import songRouter from './song'
import categoryRouter from './category'
import singerRouter from './singer'
import userRouter from './user'
import albumRouter from './album'
import likeRouter from './like'

router.use('/song', songRouter);
router.use('/category', categoryRouter);
router.use('/singer', singerRouter);
router.use('/user', userRouter);
router.use('/album', albumRouter);
router.use('/like', likeRouter);

export default router