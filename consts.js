import dotenv from 'dotenv'

dotenv.config()

const CONSTS = {
  MONGO_DB_CONNECTION: process.env.MONGO_DB_CONNECTION,
  PORT: process.env.PORT,
}

export default CONSTS
