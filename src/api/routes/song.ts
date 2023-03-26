import BaseRoutes from './base';
import SongController from './../controllers/song';
import SongService from '../services/song';
import SongRepository from '../repositories/song';
import AuthJwt from './../middlewares/jwt';
import Validation from './../helpers/validate';
import CreateSongDto from './../dtos/song/song.create';
import UpdateSongDto from './../dtos/song/song.update';

export default class SongRoutes extends BaseRoutes {

    path = '/songs';
    constructor(private songController: SongController, authJwt: AuthJwt) {
        super(authJwt);
    }
    initializeRoutes(): void {
        this.getRouter().get('/', this.songController.getAllAndCount);
        this.getRouter().get('/recent-songs',this.authJwt.verifyToken(false), this.songController.getRecentSongs);
        this.getRouter().patch('/recent-songs',this.authJwt.verifyToken(false), this.songController.updateRecentSongs);
        this.getRouter().patch('/update-views/:id', this.songController.updateViews);
        this.getRouter().get('/chart', this.songController.getChart);
        this.getRouter().get('/:id', this.songController.getDetailById);

        this.getRouter().use(this.authJwt.verifyToken(false));
        this.getRouter().use(this.authJwt.protect);

        this.getRouter().post('/', Validation(CreateSongDto), this.songController.createAndSave);
        this.getRouter().delete('/:id', this.songController.delete);
        this.getRouter().patch('/:id', Validation(UpdateSongDto), this.songController.findByIdAndUpdate);
    }
    static initRoutes(): SongRoutes {
        let repository = new SongRepository();
        let service = new SongService(repository);
        let controller = new SongController(service);
        const auth = new AuthJwt();
        let routes = new SongRoutes(controller, auth);
        routes.initializeRoutes();
        return routes;
    }

}

