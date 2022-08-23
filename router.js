import express from 'express'
import moviesController from './controller/moviesController.js'
import userController from './controller/userController.js'
import auth from './middleware/auth.js'
import commentsController from './controller/commentsController.js'

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

// ! Comment routes here
// Create comment on movie
router.route('/comment/:movieId').post(auth, commentsController.create)

router
  .route('/:movieId/:commentId')
  // update comment
  .put(auth, commentsController.update)
  // remove comment
  .delete(auth, commentsController.remove)

export default router
