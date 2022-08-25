import mongoose from 'mongoose'
import { commentSchema } from './movies.js'
const GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Sci-Fi',
  'Fantasy',
  'Superhero',
  'Animal',
  'Anime',
]

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // confirmPassword: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  favouriteMovieGenre: { type: String, enum: GENRES },
  watchlist: [],
  createdAt: { type: Date, default: Date.now() },
  comments: [commentSchema],
})

export default mongoose.model('User', userSchema)
