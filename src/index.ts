import App from './app';
import { AppDataSource } from './api/databases/postgres';
import { updateViewsOfAllSongs, countViewEveryHourSchedule } from './api/helpers/nodeSchedule';

AppDataSource.initialize().then(() => {
    const app = new App();
    app.listen();
    updateViewsOfAllSongs;
    countViewEveryHourSchedule;
}).catch(err => {
    console.error("Error during Data Source initialization", err);
});
