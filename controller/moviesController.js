import MovieModel from '../models/movies.js'

const getAll = async (req, res) => {
  const allMovies = await MovieModel.find()
  return res.status(200).json(allMovies)
}

const getSingle = async (req, res) => {
  const { movieId } = req.params
  const singleMovie = await MovieModel.findById(movieId)
  return res.status(200).json(singleMovie)
}

export default { getAll, getSingle }