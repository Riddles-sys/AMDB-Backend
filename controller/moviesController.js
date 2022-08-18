import MovieModel from '../models/movies.js'

const getAll = async (req, res) => {
  const allMovies = await MovieModel.find()
  return res.status(200).json(allMovies)
}

export default { getAll }