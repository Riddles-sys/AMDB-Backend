import MovieModel from '../models/movies.js'
import UserModel from '../models/user.js'

// * CREATE COMMENT -------------

const create = async (req, res, next) => {
  const { movieId } = req.params
  const { body: newComment } = req
  // console.log('newComment -> ', newComment)
  // console.log('req', req.currentUser)
  // console.log('reqUserName', req.currentUser.userName)
  try {
    // Find Movie
    const movie = await MovieModel.findById(movieId)
    const user = await UserModel.findById(req.currentUser.id)
    // console.log(movie)
    if (! newComment.rating) {
      console.log('no rating')
      return res
        .status(404).send({ message: 'Please also rate the movie!' })
    }
    // check if it exist
    if (!movie) {
      return res.status(404).json({ message: `movie ${movieId} not found` })
    }
    // console.log(movie)

    // check if the current user has already commented on this movie
    const foundComment = movie.comments.find(comment => comment.createdBy.toString() === req.currentUser.id)
    if (foundComment) {
      // console.log('ERROR LOGGG-->', res.status(404).json({ message: `User ${req.currentUser.userName} Already commented on this movie!` }))
      // return res
      //   .status(404)
      //   .json({ message: `User ${req.currentUser.userName} Already commented on this movie!` })

      return res
        .status(404).send({ message: 'You have already commented on this movie!' })
    }
    // console.log('new comment ->', newComment)

    // push new comment to comments array of the movie and add createdBy
    movie.comments.push({
      ...newComment,
      createdBy: req.currentUser.id,
      userName: req.currentUser.userName,
      movieName: movie.name,
    })

    user.comments.push({
      ...newComment,
      createdBy: req.currentUser.id,
      userName: req.currentUser.userName,
      movieName: movie.name,
      moviePoster: movie.posterImg,
      movieID: movieId,
      // movieCommented: movie,
    })

    // save it to movieDB
    await movie.save()
    await user.save()
    return res.status(200).send({
      message: 'Comment successfully created!',
      createdComment: newComment,
    })
  } catch (error) {
    next(error)
  }
}

// * UPDATE COMMENT -------------------

const update = async (req, res, next) => {
  console.log(req.params)
  const { movieId, commentId } = req.params
  const { body: modifiedComment } = req
  console.log(movieId)
  try {
    // Find movie
    const movie = await MovieModel.findById(movieId)
    const user = await UserModel.findById(req.currentUser.id)
    if (!movie) {
      return res
        .status(404)
        .json({ message: `movie with ${movieId} not found.` })
    }

    // Find comment by comment ID
    const targetComment = movie.comments.find(
      (comment) => comment._id.toString() === commentId
    )
    console.log('found comment', targetComment)

    // check if user created comment or is admin
    if (
      targetComment.createdBy.toString() !== req.currentUser.id &&
      req.currentUser.role !== 'admin'
    ) {
      return res
        .status(403)
        .send({ message: 'Forbidden! No permission to update comment' })
    }

    // Update that comment
    movie.comments = movie.comments.map((comment) => {
      if (comment._id.toString() === commentId) {
        const updatedComment = { ...comment, ...modifiedComment }
        return updatedComment
      } else {
        return comment
      }
    })

    user.comments = user.comments.map((comment) => {
      console.log('comment.movieID')
      if (comment.movieID.toString() === movieId) {
        const updatedComment = { ...comment, ...modifiedComment }
        return updatedComment
      } else {
        return comment
      }
    })

    // Save to db
    await movie.save()
    await user.save()

    // response
    const comment = movie.comments.find(
      (comment) => comment._id.toString() === commentId
    )
    return res
      .status(200)
      .send({ message: 'Comment has been updated', comment })
  } catch (error) {
    next(error)
  }
}

// * REMOVE COMMENT ---------------------

const remove = async (req, res, next) => {
  console.log(req.params)
  const { movieId, commentId } = req.params

  try {
    // Find movie
    const movie = await MovieModel.findById(movieId)
    const user = await UserModel.findById(req.currentUser.id)
    if (!movie) {
      return res
        .status(404)
        .json({ message: `movie with ${movieId} not found.` })
    }

    // Find comment by comment ID
    const targetComment = movie.comments.find(
      (comment) => comment._id.toString() === commentId
    )
    console.log('found comment', targetComment)

    // check if user created comment or is admin
    if (
      targetComment.createdBy.toString() !== req.currentUser.id &&
      req.currentUser.role !== 'admin'
    ) {
      return res
        .status(403)
        .json({ message: 'Forbidden! No permission to update comment' })
    }

    // delete that comment
    movie.comments = movie.comments.filter(
      (comment) => comment._id.toString() !== commentId
    )
    user.comments = user.comments.filter(
      (comment) => comment.movieID.toString() !== movieId
    )

    // Save to db
    await movie.save()
    await user.save()

    // response
    const comments = movie.comments
    return res
      .status(200)
      .send({ message: 'Comment has been deleted', comments })
  } catch (error) {
    next(error)
  }
}

export default { create, update, remove }
