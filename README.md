# API MHMUSIC

## Name
API MHMUSIC

## Description
REST API using NodeJS, TypeScript, ExpressJs, TypeORM, Postgres, Redis with functions: 
`````````````````
Authentication and Authorization by JWT
Calculate views of songs using Redis to reduce the load on Postgres
Validation 
Charting the top songs with the highest views

`````````````````



## Set up

1. Install the libraries required
``````
cd project
npm i
``````
2. Config environment variables
``````
Jwt
SECRET_KEY=your-key-access-token 
``````
``````
Database
DB_HOST=your-host
DB_PORT=your-port
DB_USERNAME=your-username
DB_PASSWORD=your-password
DB_DBNAME=your-dbname
REDIS_URL=your-redis-url
``````



3. Run project

Compile typescript code into javascript
`````````
npx tsc
`````````

In development mode

`````````
npm run dev
`````````

In production mode
 
`````````
 npm start
`````````
    
## Author
Manh Hoach




