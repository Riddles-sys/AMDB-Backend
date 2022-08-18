import mongoose from 'mongoose'
import connectToDb from './db.js'
import MovieModel from '../models/movies.js'
import seedingData from './seedingData.js'

const seed = async () => {
  await connectToDb()
  console.log('connected')
  await mongoose.connection.db.dropDatabase()


  const existingMovies = await MovieModel.find()
  console.log('existing', existingMovies)
  const dbMovies = await MovieModel.create(seedingData.movies)
  console.log(`${dbMovies.length} moves created in Db`)
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect()
  }
  console.log('Data reset')
}

seed()