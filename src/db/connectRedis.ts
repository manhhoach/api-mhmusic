import Redis  from 'ioredis';

let connectionString=process.env.REDIS_URL as string|| '127.0.0.1:6379';
const redis=new Redis (connectionString);

export default redis