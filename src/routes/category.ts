import express, {Router} from 'express'
const router: Router = express.Router()
import * as categoryController from './../controllers/category'
import * as jwt from './../middlewares/jwt_token';

router.get('/', categoryController.getAll); // done

router.use(jwt.decodeToken);
router.use(jwt.protect)
router.post('/', categoryController.create); // done
router.put('/:id', categoryController.update); // done
router.delete('/', categoryController.destroy); // done

export default router