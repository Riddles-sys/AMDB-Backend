import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: Number,
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  userName: { type: String, ref: 'User', required: true },
})

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  cast: { type: Array, required: true },
  directors: { type: Array, required: true },
  releaseYear: { type: Number, required: true },
  runtime: { type: String, required: true },
  tags: { type: Array, required: true },
  avgUserRating: { type: Number, required: true },
  imdbRating: { type: Number, required: true },
  budget: { type: String, required: true },
  boxOffice: { type: String, required: true },
  productionCompany: { type: Array, required: true },
  posterImg: { type: String, required: true },
  stills: {
    img1: { type: String, required: true },
    img2: { type: String, required: true },
    img3: { type: String, required: true },
  },
  youtubeId: { type: String, required: true },
  officialSite: { type: String },
  comments: [commentSchema],
  createdAt: { type: Date, default: Date.now() },
})

movieSchema.virtual('avgRating').get(function () {
  if (!this.comments.length) return 'Not rated'
  const sum = this.comments.reduce((acc, comments) => {
    return acc + comments.rating
  }, 0)
  return Number(sum / this.comments.length).toFixed(2)
})

movieSchema.set('toJSON', { virtual: true })


export default mongoose.model('Movie', movieSchema)