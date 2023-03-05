// import { Router } from 'express'
// import SongController from './../controllers/song'
// import AuthJwt from './../middlewares/jwt'
// import Validation from './../helpers/validate'
// import CreateSongDto from './../dtos/song/song.create'
// import UpdateSongDto from './../dtos/song/song.update'

// export default class UserRoutes {
//     private router = Router();
//     public path: string = '/songs'
//     private authJwt = new AuthJwt();
//     private songController = new SongController();
//     constructor() {
//         this.initializeRoutes()
//     }
//     private initializeRoutes(): void {
//         this.router.get('/', this.songController.getAll)
//         this.router.get('/recent-songs',this.authJwt.verifyToken(false), this.songController.getRecentSongs)
//         this.router.post('/recent-songs',this.authJwt.verifyToken(false), this.songController.updateRecentSongs)
//         this.router.post('/views/:id', this.songController.updateView)
//         this.router.get('/chart', this.songController.getChart)
//         this.router.get('/:id', this.songController.getOne)

//         this.router.use(this.authJwt.verifyToken(false))
//         this.router.use(this.authJwt.protect)

//         this.router.post('/', Validation(CreateSongDto), this.songController.insert)
//         this.router.delete('/:id', this.songController.destroy)
//         this.router.patch('/:id', Validation(UpdateSongDto), this.songController.update)
//     }

//     public getRouter(): Router {
//         return this.router;
//     }

// }

