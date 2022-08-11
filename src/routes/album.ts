import express, { Router } from 'express'
const router: Router = express.Router()
import * as albumController from './../controllers/album'
import * as jwt from './../middlewares/jwt_token';




router.get('/', jwt.checkTokenExistOrNot, albumController.getAll); // done
router.get('/:albumId', jwt.checkTokenExistOrNot, albumController.getOne); // done

router.use(jwt.decodeToken);
router.post('/', albumController.create); // done
router.post('/add-song', albumController.addSong) // done
router.delete('/remove-song', albumController.removeSong) // done
router.put('/:id', albumController.update); // done
router.delete('/', albumController.destroy); // done

export default router