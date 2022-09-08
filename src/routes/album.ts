import express, { Router } from 'express'
const router: Router = express.Router()
import * as albumController from './../controllers/album'
import * as jwt from './../middlewares/jwt_token';




router.get('/', jwt.checkTokenExistOrNot, albumController.getAll);
router.get('/:albumId', jwt.checkTokenExistOrNot, albumController.getOne);

router.use(jwt.decodeToken);
router.post('/', albumController.create);
router.post('/add-song', albumController.addSong);
router.delete('/remove-song', albumController.removeSong);
router.put('/:id', albumController.update);
router.delete('/', albumController.destroy);

export default router