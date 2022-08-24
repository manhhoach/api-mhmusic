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
const config_1 = __importDefault(require("../db/config"));
const connectRedis_1 = __importDefault(require("./../db/connectRedis"));
const node_schedule_1 = __importDefault(require("node-schedule"));
let models = config_1.default.models;
const job = node_schedule_1.default.scheduleJob('* */1 * * *', function () {
    return __awaiter(this, void 0, void 0, function* () {
        let songs = yield models.song.findAll();
        yield Promise.all(songs.map((song) => __awaiter(this, void 0, void 0, function* () {
            let view = yield connectRedis_1.default.get(`songId:${song.id}`);
            if (view != song.view)
                return yield models.song.update({ view: parseInt(view) }, { where: { id: song.id } });
        })));
        console.log('update');
    });
});
exports.default = job;
// map views from redis to mysql
// const mappingView = async () => {
//     let songs = await models.song.findAll();
//     let data = await Promise.all(songs.map(async (song: any) => {
//         let view = await redis.get(`songId:${song.id}`);
//         if (view != song.view)
//             return await models.song.update({ view: parseInt(view as string) }, { where: { id: song.id } })
//     }))
//     return data;
// }
