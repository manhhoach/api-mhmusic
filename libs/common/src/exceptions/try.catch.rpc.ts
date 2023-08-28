import { RpcException } from '@nestjs/microservices';

export const tryCatchRpcException = async (promise: Promise<any>) => {
  try {
    const data = await promise;
    return data;
  } catch (err) {
    console.log('err in grpc', err);
    throw new RpcException(JSON.stringify(err.response));
  }
};
