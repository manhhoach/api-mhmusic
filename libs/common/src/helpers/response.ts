export const responseSucess = (statusCode: number, data?: any) => {
  return {
    success: true,
    statusCode: statusCode ? statusCode : 200,
    data: data ? data : null,
  };
};

export const responseError = (err: any) => {
  let statusCode = 500;
  if (typeof err === 'string') statusCode = 400;
  return {
    success: false,
    statusCode: err.statusCode ? err.statusCode : statusCode,
    message: err.message ? err.message : 'Error',
    error: err.error ? err.error : err ? err : 'Error',
  };
};
