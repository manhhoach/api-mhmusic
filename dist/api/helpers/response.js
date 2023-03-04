"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseError = exports.responseSuccess = void 0;
function responseSuccess(data) {
    return {
        success: true,
        data: data
    };
}
exports.responseSuccess = responseSuccess;
function responseError(error) {
    return {
        success: false,
        error: error.detail ? error.detail : error
    };
}
exports.responseError = responseError;
