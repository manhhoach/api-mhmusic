"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertTZ(date) {
    return new Date(date).toLocaleString("vi-VN", { timeZone: 'Asia/Ho_Chi_Minh' });
}
exports.default = convertTZ;
