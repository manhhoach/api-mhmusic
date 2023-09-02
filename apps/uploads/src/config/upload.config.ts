export default () => ({
    s3: {
        region: process.env.REGION,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_ACCESS_KEY,
        }
    },
    bucketName: process.env.BUCKET_NAME
});