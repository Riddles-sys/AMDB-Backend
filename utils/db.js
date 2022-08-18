import mongoose from 'mongoose'
import CONSTS from '../consts.js'

const connectToDb = async () => {
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
  console.log('connection', CONSTS.MONGO_DB_CONNECTION)
  return mongoose.connect(CONSTS.MONGO_DB_CONNECTION, opts)
}

export default connectToDb