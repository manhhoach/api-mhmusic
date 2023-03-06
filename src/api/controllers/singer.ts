// import { Request, Response, NextFunction } from 'express'
// import SingerService from './../services/singer'
// import tryCatch from '../helpers/tryCatch';
// import { responseSuccess } from '../helpers/response';

// export default class SingerController {
//     private singerService = new SingerService()

//     public getOne(req: Request, res: Response, next: NextFunction) {
//         res.status(200).json(responseSuccess(res.locals.user))
//     }

//     public getAll(req: Request, res: Response, next: NextFunction) {
//         res.status(200).json(responseSuccess(res.locals.user))
//     }

//     public update = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
//         let { name } = req.body;
//         let user = await this.singerService.update(res.locals.user.id, name);
//         res.status(201).json(responseSuccess(user))
//     })

//     public insert = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
//         let { email, password, name } = req.body;
//         let user = await this.singerService.register(name, email, password)
//         res.status(201).json(responseSuccess(user))
//     })


//     public destroy = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
//         let id = req.params.id;
//         let result = await this.singerService.destroy(id);
//         res.status(200).json(responseSuccess(result))
//     })
// }

