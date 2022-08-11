export function responseSuccess(data: any){
    return {
        success: true,
        data: data
    }
}

export function responseError(error: any){
    let message: string = 'Unknown Error';
    if(error instanceof Error)
        message=error.message;
    else
        message=String(error);    
    return {
        success: false,
        error: message
    }    
}