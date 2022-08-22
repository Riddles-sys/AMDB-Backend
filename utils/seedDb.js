import mongoose from 'mongoose'
import connectToDb from './db.js'
import MovieModel from '../models/movies.js'
import seedingData from './seedingData.js'
import UserModel from '../models/user.js'

const seed = async () => {
  await connectToDb()
  console.log('DB connected')
  await mongoose.connection.db.dropDatabase()

  // ! Creating the user database
  const dbUsers = await UserModel.create([
    seedingData.users.admin,
    seedingData.users.user,
  ])

  console.log(`${dbUsers.length} users have been created in the DB successfully.`)

  // ! Creating the movie database
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