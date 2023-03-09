import App from './app'
import { AppDataSource } from './api/databases/postgres'
import { updateViewsOfAllSongs } from './api/helpers/nodeSchedule'

AppDataSource.initialize().then(() => {
    const app = new App()
    app.listen();
    updateViewsOfAllSongs;
}).catch(err => {
    console.error("Error during Data Source initialization", err)
})
