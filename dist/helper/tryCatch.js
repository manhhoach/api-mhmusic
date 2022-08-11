"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const response_1 = require("./../helper/response");
function tryCatch(func) {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            res.json((0, response_1.responseError)(err));
        });
    };
}
exports.default = tryCatch;
