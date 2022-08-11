import { Request, Response, NextFunction } from 'express'
import * as userService from './../services/user'
import { responseSuccess, responseError } from './../helper/response'
import tryCatch from './../helper/tryCatch'
import { IUser } from './../models/user'
import bcryptjs from 'bcryptjs'
import * as jwt from './../middlewares/jwt_token'
import * as mailService from './../services/mail'
import jsonwebtoken from 'jsonwebtoken'



const comparePassword = (str: string, strHash: string) => {
    return bcryptjs.compareSync(str, strHash)
}

export const getMe = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    res.json(responseSuccess(res.locals.user))
})


export const register = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let user: IUser = req.body;
    let checkMail = await userService.getOne({ email: user.email }, false);
    if (checkMail) {
        res.json(responseError("EMAIL ALREADY IS USED"))
    }
    else {
        let data = await userService.create(user)
        res.json(responseSuccess(data));
    }

})

export const login = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let user: IUser = req.body;
    let checkUser: any = await userService.getOne({ email: user.email }, true);
    if (checkUser) {
        if (comparePassword(user.password, checkUser.password)) {
            let token = jwt.signToken({ id: checkUser.id, email: checkUser.email });
            res.json(responseSuccess({ ...checkUser.dataValues, token }))
        }
        else {
            res.json(responseError("PASSWORD IS INVALID"))
        }

    }
    else {
        res.json(responseError("EMAIL IS NOT EXIST"))
    }

})

export const updateMe = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    let user = { fullName: req.body.fullName, avatar: req.body.avatar };

    let result = await userService.update(user, { id: res.locals.user.id });
    if (result[0] === 1) {
        let data = await userService.getOne({ id: res.locals.user.id }, false);
        res.json(responseSuccess(data));
    }
    else {
        res.json(responseError("UPDATE FAILED"))
    }

})

export const destroy = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    let result = await userService.destroy({ id: req.params.id })
    if (result === 1) {
        res.json(responseSuccess("DELETE SUCCESS"));
    }
    else {
        res.json(responseError("UPDATE FAILED"))
    }
})

export const changePassword = tryCatch(async (req: Request, res: Response, next: NextFunction) => {

    if (comparePassword(req.body.oldPassword, res.locals.user.password)) {
        let result = await userService.update({ password: req.body.newPassword }, { id: res.locals.user.id })
        if (result[0] === 1) {
            res.json(responseSuccess("CHANGE PASSWORD SUCCESSFULLY"));
        }
        else {
            res.json(responseError("PASSWORD CHANGE FAILED"))
        }
    }
    else {
        res.json(responseError("PASSWORD IS INVALID"))
    }


})

export const resetPassword = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let token = req.params.token;
    let decoded: any = jsonwebtoken.verify(token, process.env.SECRET_KEY as string);
    let user: any = await userService.getOne({ id: decoded.id, email: decoded.email }, false)
    if (user) {
        let result = await userService.update({ password: req.body.password }, { id: user.id })
        if (result[0] === 1)
            res.json(responseSuccess("RESET PASSWORD SUCCESSFULLY"))
        else
            res.json(responseError("RESET PASSWORD FAILED"))
    }
    else {
        res.json(responseError("USER IS NOT EXIST"))
    }

})

export const forgotPassword = tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let user: any = await userService.getOne({ email: req.body.email }, false);
    if (user) {
        let token = jwt.signToken({ id: user.id, email: user.email });
        let url = `${req.protocol}://${req.get('host')}/user/reset-password/${token}`

        let data = await mailService.sendMail(req.body.email, url);
        if (data.accepted.length > 0) {
            res.json(responseSuccess("SEND MAIL SUCCESSFULLY"))
        }
        else {
            res.json(responseError("SEND MAIL FAILED"))
        }

    }
    else {
        res.json("USER IS NOT EXIST")
    }



})

export const updateRecentSongs= tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    let queueSong=res.locals.user.recentSongs.split(';');
    const LENGTH_QUEUE=10;
    if(!queueSong.includes(req.body.songId.toString()))
    {
        if(queueSong.length>=LENGTH_QUEUE)
        {
            queueSong.shift();
        }   
        queueSong.push(req.body.songId)
        let recentSongs=queueSong.join(';');

        let result = await userService.update({recentSongs}, { id: res.locals.user.id });
        if (result[0] === 1) {
            res.json(responseSuccess("UPDATE SUCCESSFULLY"))
        }
        else {
            res.json(responseError("UPDATE FAILED"))
        }
    }
    else
        res.json(responseSuccess("NOTHING UPDATE"))
})