export const responseSucess = (statusCode: number, data?: any) => {
  return {
    success: true,
    statusCode: statusCode ? statusCode : 200,
    data,
  };
};

export const responseError = (err: any) => {
  return {
    success: false,
    statusCode: err.statusCode ? err.statusCode : 500,
    message: err.message ? err.message : 'Error',
    error: err.error ? err.error : 'Error',
  };
};
