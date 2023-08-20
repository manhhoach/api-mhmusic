import { responseSucess } from "../helpers";
import { Observable, lastValueFrom } from "rxjs";

export const tryCatchHttpException = async (observable: Observable<any>) => {
  try {
    return await lastValueFrom(observable);
  } catch (err) {
    throw err;
  }
};
