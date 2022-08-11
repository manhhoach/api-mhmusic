import express, {Router} from 'express'
const router: Router = express.Router()
import * as songController from '../controllers/song'
import * as jwt from '../middlewares/jwt_token';


router.get('/', songController.getAll); // done
router.get('/:id', songController.getOne); // done

router.use(jwt.decodeToken);
router.use(jwt.protect);
router.post('/', songController.create); // done
router.put('/:id', songController.update); // done
router.delete('/', songController.destroy); // done

export default router