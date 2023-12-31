import express from 'express'
import routes from './routes' // 路由
import logger from '../utils/logger'
import initMiddleware from './middleware'
import dbConnect from '../utils/dbConnect'
const cors = require("cors");

//import config from 'config'
import config from 'config'
const PORT = config.get<number>('port')

const app = express()
app.use(express.json())
app.use(cors());

// 挂载中间件
initMiddleware(app)

// 启动
app.listen(PORT, async () => {
  logger.info(`App is running at http://localhost:${PORT}`)

  await dbConnect()

  routes(app)
})
