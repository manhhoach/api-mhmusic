import { RpcException } from '@nestjs/microservices';

export const tryCatchRpcException = async (promise: Promise<any>) => {
  try {
    return await promise;
  } catch (err) {
    console.log('err in grpc' , err);
    
    throw new RpcException(JSON.stringify(err.response));
  }
};
