import express, {Router} from 'express'
const router: Router = express.Router()
import * as singerController from './../controllers/singer'
import * as jwt from './../middlewares/jwt_token';

router.get('/', singerController.getAll); // done
router.get('/:id', singerController.getOne); // done

router.use(jwt.decodeToken);
router.use(jwt.protect);
router.post('/', singerController.create); // done
router.put('/:id', singerController.update); // done
router.delete('/', singerController.destroy); // done

export default router