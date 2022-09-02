import express, { Application, Request, Response } from 'express'
import 'dotenv/config'; // kỹ thuật mới
import sequelizeConnection from './db/config'
import routes from './routes/index'
import cors from 'cors'
import {mapViewSchedule, countViewEveryHourSchedule} from './helper/schedule'

const app: Application = express()
const port = process.env.PORT || 3000


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('image'))
app.use(cors())

app.use(routes)

app.get('/', async (req: Request, res: Response) => {
    res.send('helllo')
})


app.listen(port, async () => {
    console.log(`Server running on http://localhost:${port}`)
    try {
        await sequelizeConnection.authenticate()
        mapViewSchedule;
        countViewEveryHourSchedule;
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.log('Unable to connect to the database:', err);
    }

})
