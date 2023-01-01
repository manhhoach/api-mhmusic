import express, { Application, Request, Response } from 'express'
import 'dotenv/config'; // kỹ thuật mới
import sequelizeConnection from './db/connectMysql'
import routes from './routes/index'
import cors from 'cors'
import {setUpView, updateViewSchedule, countViewEveryHourSchedule} from './helper/schedule'

const app: Application = express()
const port = process.env.PORT || 3000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('image'))
app.use(cors())

app.use(routes)

app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to MH-Music!')
})
setUpView();

app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`)
    try {
        await sequelizeConnection.authenticate()
        updateViewSchedule;
        countViewEveryHourSchedule;
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.log('Unable to connect to the database:', err);
    }

})
