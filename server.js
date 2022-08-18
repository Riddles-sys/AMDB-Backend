import express from 'express'
import connectToDb from './utils/db.js'
import logger from './middleware/logger.js'
import router from './router.js'
import CONSTS from './consts.js'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger)
app.use(router)

const startServer = async () => {
  await connectToDb()
  console.log('Database connected')
  app.listen(CONSTS.PORT, () => {
    console.log(`🤯Server running on port ${CONSTS.PORT}🤯`)
  })
}

startServer()
