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
    console.log('movie ->', movieId)
    // console.log(foundUser)


    // console.log('movie id ->', movieId)
    // console.log(foundMovie)
    // console.log('found movie ->', foundMovie)
    // add specified movie to user's watchlist
    foundUser.watchlist.push(foundMovie)
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
  const { movieId } = req.params
  try {
    const foundUser = await UserModel.findById(req.currentUser._id)
    // const foundMovie = await MovieModel.findById(movieId)
    console.log('watchlist of user ->', req.currentUser._id)
    console.log('movie to remove ->', movieId)
    console.log('MOVIE REMOVED')
    if (!foundUser) {
      return res.status(404).json({ message: `User could not be found.` })
    }

    foundUser.watchlist = foundUser.watchlist.filter(
      (movie) => movie._id.toString() !== movieId
    )

    await foundUser.save()

    return res
      .status(200)
      .send({ message: 'movie has been remove from watchlist' })
  } catch (error) {
    next(error)
  }
}

export default { getWatchlist, addToWatchlist, removeFromWatchlist }
