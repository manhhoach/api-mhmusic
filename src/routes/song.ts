import express, {Router} from 'express'
const router: Router = express.Router()
import * as songController from '../controllers/song'
import * as jwt from '../middlewares/jwt_token';


router.get('/', songController.getAll); 
router.get('/recent-songs',jwt.decodeToken, songController.getRecentSongs); 
router.post('/views/:id', songController.updateView); 
router.get('/chart', songController.getChart);
router.get('/top-10', songController.getTop10Song);
router.get('/:id', songController.getOne); 


router.use(jwt.decodeToken);


router.use(jwt.protect);
router.post('/', songController.create); 
router.put('/:id', songController.update); 
router.delete('/', songController.destroy); 

export default router