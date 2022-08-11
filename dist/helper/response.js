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
    let message = 'Unknown Error';
    if (error instanceof Error)
        message = error.message;
    else
        message = String(error);
    return {
        success: false,
        error: message
    };
}
exports.responseError = responseError;
