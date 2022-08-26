import express from 'express'
import connectToDb from './utils/db.js'
import logger from './middleware/logger.js'
import router from './router.js'
import CONSTS from './consts.js'
import cors from 'cors'
import errorHandler from './middleware/errorHandler.js'
import dotenv from 'dotenv'

const startServer = async () => {
  const app = express()
  dotenv.config()
  
  app.use(cors())
  app.use(express.json())
  app.use(logger)
  app.use(router)
  app.use(errorHandler)

  // ! CATCH
  app.use((req, res, next) => {
    console.log('request cant be met', req.url, req.method)
    return res.status(404).send('404 - Required endpoint not found.')
  })

  await connectToDb()
  console.log('Database connected')
  app.listen(CONSTS.PORT, () => {
    console.log(`🤯Server running on port ${CONSTS.PORT}🤯`)
  })
}

startServer()
