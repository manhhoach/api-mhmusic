import { RpcException } from '@nestjs/microservices';

export const tryCatchGrpcException = async (promise: Promise<any>) => {
  try {
    return await promise;
  } catch (err) {
    throw new RpcException(err);
  }
};
