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
exports.checkTokenExistOrNot = exports.protect = exports.decodeToken = exports.signToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const response_1 = require("../helper/response");
const userService = __importStar(require("./../services/user"));
function signToken(user) {
    return jsonwebtoken_1.default.sign(user, process.env.SECRET_KEY, { expiresIn: '7d' });
}
exports.signToken = signToken;
function decodeToken(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (token) {
                let decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
                let user = yield userService.getOne({ id: decoded.id, email: decoded.email }, true);
                if (user) {
                    res.locals.user = user;
                    next();
                }
                else {
                    res.json((0, response_1.responseError)("User is not found"));
                }
            }
            else {
                res.json((0, response_1.responseError)("Invalid or expired token provided!"));
            }
        }
        catch (err) {
            res.json((0, response_1.responseError)("Invalid or expired token provided!"));
        }
    });
}
exports.decodeToken = decodeToken;
function protect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (res.locals.user.type === 10)
            next();
        else
            res.json((0, response_1.responseError)("You can not access this route"));
    });
}
exports.protect = protect;
function checkTokenExistOrNot(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            let decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY);
            let user = yield userService.getOne({ id: decoded.id, email: decoded.email }, true);
            if (user) {
                res.locals.user = user;
            }
            next();
        }
        catch (err) {
            next();
        }
    });
}
exports.checkTokenExistOrNot = checkTokenExistOrNot;
