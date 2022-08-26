import mongoose from 'mongoose'

export const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  rating: Number,
  createdAt: { type: Date, default: Date.now() },
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  userName: { type: String, ref: 'User', required: true },
  movieName: String,
  moviePoster: String,
  movieID: { type: mongoose.Schema.ObjectId, ref: 'Movie' },
})

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true, unique: true },
  cast: { type: Array, required: true },
  directors: { type: Array, required: true },
  releaseYear: { type: Number, required: true },
  runtime: { type: String, required: true },
  tags: { type: Array, required: true },
  imdbRating: { type: Number, required: true },
  budget: { type: String, required: true },
  boxOffice: { type: String, required: true },
  productionCompany: { type: Array, required: true },
  posterImg: { type: String, required: true },
  avgRating: Number,
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

movieSchema.pre('save', function (next) {
  if (!this.comments.length) {
    this.avgRating = null
  } else {
    const sum = this.comments.reduce((acc, comments) => {
      return acc + comments.rating
    }, 0)
    this.avgRating = Number(sum / this.comments.length).toFixed(2)
  }
  next()
})


export default mongoose.model('Movie', movieSchema)