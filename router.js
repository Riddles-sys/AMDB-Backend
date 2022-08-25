import express from 'express'
import moviesController from './controller/moviesController.js'
import userController from './controller/userController.js'
import auth from './middleware/auth.js'
import commentsController from './controller/commentsController.js'
import watchlistController from './controller/watchlistController.js'

const router = express.Router()

router.route('/').get((req, res) => res.status(200).send('API Root Running!'))

// ! Movie routes
router.route('/movies').get(moviesController.getAll)
router.route('/movies/:movieId').get(moviesController.getIndividual)

// ! Auth routes
router.route('/register').post(userController.register)
router.route('/login').post(userController.login)

// ! User Profile route
router.route('/profile').get(auth, userController.getUserProfile)

// ! User Watchlist route
// get all movies in user's watchlist
router.route('/watchlist').get(auth, watchlistController.getWatchlist)
// add a movie to a user's watchlist
router
  .route('/watchlist/add/:movieId')
  .post(auth, watchlistController.addToWatchlist)
// remove a movie from a user's watchlist
router
  .route('/watchlist/remove/:movieId')
  .delete(auth, watchlistController.removeFromWatchlist)

// ! Comment routes here
// Create comment on movie
router.route('/:movieId/comment/').post(auth, commentsController.create)

router
  .route('/:movieId/:commentId')
  // update comment
  .put(auth, commentsController.update)
  // remove comment
  .delete(auth, commentsController.remove)

export default router
