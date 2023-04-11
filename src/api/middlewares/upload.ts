const multer = require('multer');

const storage = multer.memoryStorage();

//@typescript-eslint/no-var-requires
export const uploadMulter = multer({ storage: storage }); 

