import express from 'express'
import moviesController from './controller/moviesController.js'
import userController from './controller/userController.js'

const router = express.Router()

router.route('/').get((req, res) => res.status(200).send('API Root Running!'))

// ! Movie routes
router.route('/movies').get(moviesController.getAll)
router.route('/movies/:movieId').get(moviesController.getIndividual)


// ! Auth routes
router.route('/register').post(userController.register)
router.route('/login').post(userController.login)

// ! Comment routes here

export default router
