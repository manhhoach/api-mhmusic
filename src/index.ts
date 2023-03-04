import App from './app'
import { AppDataSource } from './api/databases/postgres'

AppDataSource.initialize().then(()=>{
    const app = new App()
    app.listen()
}).catch(err =>{
    console.error("Error during Data Source initialization", err)
})
