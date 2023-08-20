import { responseError, responseSucess } from "../helpers";
import { Observable, lastValueFrom } from "rxjs";

export const tryCatchHttpException = async (task: Observable<any> | Promise<any>, statusCode: number) => {
  try {
    if (task instanceof Observable) {
      task = lastValueFrom(task);
    }
    let data = await task;
    return responseSucess(statusCode, data)
  } catch (err) {
    let e = err.response ? err.response : JSON.parse(err.details)
    return responseError(e)
  }
};

// details: '{"message":"NOT FOUND","error":"Not Found","statusCode":404}',