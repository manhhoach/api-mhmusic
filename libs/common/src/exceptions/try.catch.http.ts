import { responseError, responseSucess } from '../helpers';
import { Observable, lastValueFrom } from 'rxjs';

export const tryCatchHttpException = async (
  task: Observable<any> | Promise<any>,
  statusCode: number,
) => {
  try {
    if (task instanceof Observable) {
      task = lastValueFrom(task);
    }
    const data = await task;
    return responseSucess(statusCode, data);
  } catch (err) {
    const error = err.details ? JSON.parse(err.details) : err.response;
    return responseError(error);
  }
};

// details: '{"message":"NOT FOUND","error":"Not Found","statusCode":404}',
