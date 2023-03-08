import BaseRoutes from './base'
import SongController from './../controllers/song'
import AuthJwt from './../middlewares/jwt'
import Validation from './../helpers/validate'
import CreateSongDto from './../dtos/song/song.create'
import UpdateSongDto from './../dtos/song/song.update'

export default class SongRoutes extends BaseRoutes {
    path: string = '/songs'
    private authJwt = new AuthJwt();
    private songController = new SongController();
    constructor() {
        super();
        this.initializeRoutes()
    }
    initializeRoutes(): void {
        this.getRouter().get('/', this.songController.getAllAndCount)
       // this.getRouter().get('/recent-songs',this.authJwt.verifyToken(false), this.songController.getRecentSongs)
      //  this.getRouter().post('/recent-songs',this.authJwt.verifyToken(false), this.songController.updateRecentSongs)
       // this.getRouter().post('/views/:id', this.songController.updateView)
       // this.getRouter().get('/chart', this.songController.getChart)
        this.getRouter().get('/:id', this.songController.getDetailById)

        this.getRouter().use(this.authJwt.verifyToken(false))
        this.getRouter().use(this.authJwt.protect)

        this.getRouter().post('/', Validation(CreateSongDto), this.songController.createAndSave)
        this.getRouter().delete('/:id', this.songController.delete)
        this.getRouter().patch('/:id', Validation(UpdateSongDto), this.songController.findByIdAndUpdate)
    }

}

