"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRecentSongs = exports.forgotPassword = exports.resetPassword = exports.changePassword = exports.destroy = exports.updateMe = exports.login = exports.register = exports.getMe = void 0;
const userService = __importStar(require("./../services/user"));
const response_1 = require("./../helper/response");
const tryCatch_1 = __importDefault(require("./../helper/tryCatch"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt = __importStar(require("./../middlewares/jwt_token"));
const mailService = __importStar(require("./../services/mail"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const connectRedis_1 = __importDefault(require("./../db/connectRedis"));
const comparePassword = (str, strHash) => {
    return bcryptjs_1.default.compareSync(str, strHash);
};
exports.getMe = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json((0, response_1.responseSuccess)(res.locals.user));
}));
exports.register = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.body;
    let checkMail = yield userService.getOne({ email: user.email }, false);
    if (checkMail) {
        res.json((0, response_1.responseError)("EMAIL ALREADY IS USED"));
    }
    else {
        let data = yield userService.create(user);
        res.json((0, response_1.responseSuccess)(data));
    }
}));
exports.login = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = req.body;
    let checkUser = yield userService.getOne({ email: user.email }, true);
    if (checkUser) {
        if (comparePassword(user.password, checkUser.password)) {
            let token = jwt.signToken({ id: checkUser.id, email: checkUser.email });
            res.json((0, response_1.responseSuccess)(Object.assign(Object.assign({}, checkUser.dataValues), { token })));
        }
        else {
            res.json((0, response_1.responseError)("PASSWORD IS INVALID"));
        }
    }
    else {
        res.json((0, response_1.responseError)("EMAIL IS NOT EXIST"));
    }
}));
exports.updateMe = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = { fullName: req.body.fullName, avatar: req.body.avatar };
    let result = yield userService.update(user, { id: res.locals.user.id });
    if (result[0] === 1) {
        let data = yield userService.getOne({ id: res.locals.user.id }, false);
        res.json((0, response_1.responseSuccess)(data));
    }
    else {
        res.json((0, response_1.responseError)("UPDATE FAILED"));
    }
}));
exports.destroy = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let result = yield userService.destroy({ id: req.params.id });
    if (result === 1) {
        res.json((0, response_1.responseSuccess)("DELETE SUCCESS"));
    }
    else {
        res.json((0, response_1.responseError)("UPDATE FAILED"));
    }
}));
exports.changePassword = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (comparePassword(req.body.oldPassword, res.locals.user.password)) {
        let result = yield userService.update({ password: req.body.newPassword }, { id: res.locals.user.id });
        if (result[0] === 1) {
            res.json((0, response_1.responseSuccess)("CHANGE PASSWORD SUCCESSFULLY"));
        }
        else {
            res.json((0, response_1.responseError)("PASSWORD CHANGE FAILED"));
        }
    }
    else {
        res.json((0, response_1.responseError)("PASSWORD IS INVALID"));
    }
}));
exports.resetPassword = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.params.token;
    let decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
    let user = yield userService.getOne({ id: decoded.id, email: decoded.email }, false);
    if (user) {
        let result = yield userService.update({ password: req.body.password }, { id: user.id });
        if (result[0] === 1)
            res.json((0, response_1.responseSuccess)("RESET PASSWORD SUCCESSFULLY"));
        else
            res.json((0, response_1.responseError)("RESET PASSWORD FAILED"));
    }
    else {
        res.json((0, response_1.responseError)("USER IS NOT EXIST"));
    }
}));
exports.forgotPassword = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let user = yield userService.getOne({ email: req.body.email }, false);
    if (user) {
        let token = jwt.signToken({ id: user.id, email: user.email });
        let url = `${req.protocol}://${req.get('host')}/user/reset-password/${token}`;
        let data = yield mailService.sendMail(req.body.email, url);
        if (data.accepted.length > 0) {
            res.json((0, response_1.responseSuccess)("SEND MAIL SUCCESSFULLY"));
        }
        else {
            res.json((0, response_1.responseError)("SEND MAIL FAILED"));
        }
    }
    else {
        res.json("USER IS NOT EXIST");
    }
}));
exports.updateRecentSongs = (0, tryCatch_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const TEMPLATE_RECENTSONGS = `recentSongsUser:${res.locals.user.id}`;
    const LENGTH_RECENTSONGS = 10;
    let recentSongs = yield connectRedis_1.default.lrange(TEMPLATE_RECENTSONGS, 0, -1);
    if (recentSongs.length >= LENGTH_RECENTSONGS) {
        yield connectRedis_1.default.lpop(TEMPLATE_RECENTSONGS);
    }
    if (!recentSongs.includes(req.body.songId.toString())) {
        yield connectRedis_1.default.rpush(TEMPLATE_RECENTSONGS, req.body.songId);
        recentSongs = yield connectRedis_1.default.lrange(TEMPLATE_RECENTSONGS, 0, -1);
        res.json((0, response_1.responseSuccess)(recentSongs));
    }
    else {
        res.json((0, response_1.responseError)('UPDATE FAILED'));
    }
}));
