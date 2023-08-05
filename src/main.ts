import { PORT } from '../config';
import express from 'express'
import cors from 'cors'
import router from '../src/core/routers/router';
import { DB_CONNECTION } from './core/database/database';
import cookieParser from 'cookie-parser';

const port = PORT || 5000
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use('/api', router)
// app.use(middlewareLogger)

const main = async (params?: any) => {
  try {

    // await DB_CONNECTION.authenticate()
    // await DB_CONNECTION.sync({ force: true })

    app.listen(port, () => {
      console.log(`Server listen port on: ${port}...`);
    })
  } catch (error) {
    console.log(`ERROR: ${error}`);
  }
}

main()