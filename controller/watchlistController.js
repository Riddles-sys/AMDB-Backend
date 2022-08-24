import UserModel from '../models/user.js'
import MovieModel from '../models/movies.js'

// ! GET USER WATCHLIST

const getWatchlist = async (req, res, next) => {
  // * verify user
  // * pull user watchlist data from user document

  try {
    const foundUser = await UserModel.findById(req.currentUser._id)

    if (!foundUser) {
      return res.status(404).json({ message: `User could not be found.` })
    }

    return res.status(200).json(foundUser)
  } catch (error) {
    next(error)
  }
}

// ! ADD MOVIE TO USER WATCHLIST

const addToWatchlist = async (req, res, next) => {
  // * req is sent with user indentifyer + movie identifyer
  // * add the identifyed movie to the indentifyed user watchlist
  const { movieId } = req.params
  try {
    const foundUser = await UserModel.findById(req.currentUser._id)
    const foundMovie = await MovieModel.findById(movieId)

    if (!foundUser) {
      return res.status(404).json({ message: `User could not be found.` })
    }
    console.log('user id ->', req.currentUser._id)
    // console.log(foundUser)

    // console.log('movie id ->', movieId)
    // console.log(foundMovie)
    // console.log('found movie ->', foundMovie)
    // add specified movie to user's watchlist
    foundUser.likedMovies.push(foundMovie)
    await foundUser.save()
    // console.log(foundUser)
    return res.status(200).json(foundUser)
  } catch (error) {
    next(error)
  }
}

// ! REMOVE MOVIE FROM USER WATCHLIST

const removeFromWatchlist = async (req, res, next) => {
  // * req is sent with user indentifyer + movie identifyer
  // * remove the identifyed movie from the indentifyed user watchlist
}

export default { getWatchlist, addToWatchlist, removeFromWatchlist }
