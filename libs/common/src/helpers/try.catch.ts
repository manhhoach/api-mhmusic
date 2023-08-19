import { RpcException } from '@nestjs/microservices';

export const tryCatchRpcException = async (promise: Promise<any>) => {
  try {
    return await promise;
  } catch (err) {
    throw new RpcException(err);
  }
};
