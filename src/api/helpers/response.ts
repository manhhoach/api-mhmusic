export function responseSuccess(data: any): any {
    return {
        success: true,
        data: data
    };
}

export function responseError(error: any): any {
    return {
        success: false,
        error: error
    };
}