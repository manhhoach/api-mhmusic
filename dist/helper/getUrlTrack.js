"use strict";
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
const axios_1 = __importDefault(require("axios"));
function getUrl(idSong) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const options = {
                method: 'GET',
                url: `http://api.mp3.zing.vn/api/streaming/audio/${idSong}/320`
            };
            let response = yield axios_1.default.request(options);
            return { success: true, url: response.request.res.responseUrl };
        }
        catch (err) {
            return {
                success: false,
                err: err === null || err === void 0 ? void 0 : err.message
            };
        }
    });
}
exports.default = getUrl;
