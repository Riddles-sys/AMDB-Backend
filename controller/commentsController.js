import MovieModel from '../models/movies.js'

// * CREATE COMMENT ------------- 

const create = async (req, res, next) => {
  const { movieId } = req.params
  const { body: newComment } = req

  try {
    // Find Movie
    const movie = await MovieModel.findById(movieId)
    console.log(movie)

    // check if it exist
    if (!movie) {
      return res
        .status(404)
        .json({ message: `movie ${movieId} not found` })
    }
    console.log(movie)

    // check if the current user has already commented on this movie
    const foundComment = movie.comments.find(comment => comment.createdBy.toString() === req.currentUser.id)
    if (foundComment) {
      return res
        .status(404)
        .json({ message: `User ${req.currentUser.userName} Already commented on this movie!` })
    }

    // push new comment to comments array of the movie and add createdBy
    movie.comments.push({ ...newComment, createdBy: req.currentUser.id })

    // save it to movieDB
    await movie.save()
  } catch (error) {
    next(error)
  }
}


// * UPDATE COMMENT -------------------

const update = async (req, res, next) => {
  console.log(req.params)
  const { movieId, commentId } = req.params
  const { body: modifiedComment } = req

  try {
    // Find movie
    const movie = await MovieModel.findById(movieId)
    if (!movie) {
      return res
        .status(404)
        .json({ message: `movie with ${movieId} not found.` })
    }

    // Find comment by comment ID
    const targetComment = movie.comments.find(comment => comment._id.toString() === commentId)
    console.log('found comment', targetComment)

    // check if user created comment or is admin
    if (targetComment.createdBy.toString() !== req.currentUser.id && req.currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden! No permission to update comment' })
    }

    // Update that comment
    movie.comments = movie.comments.map(comment => {
      if (comment._id.toString() === commentId) {
        const updatedComment = { ...comment, ...modifiedComment }
        return updatedComment
      } else {
        return comment
      }
    })

    // Save to db
    await movie.save()

    // response
    const comment = movie.comments.find(comment => comment._id.toString() === commentId)
    return res.status(200).send({ message: 'Comment has been updated', comment })

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
    if (!movie) {
      return res
        .status(404)
        .json({ message: `movie with ${movieId} not found.` })
    }

    // Find comment by comment ID
    const targetComment = movie.comments.find(comment => comment._id.toString() === commentId)
    console.log('found comment', targetComment)

    // check if user created comment or is admin
    if (targetComment.createdBy.toString() !== req.currentUser.id && req.currentUser.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden! No permission to update comment' })
    }

    // delete that comment
    movie.comments = movie.comments.filter(comment => comment._id.toString() !== commentId)

    // Save to db
    await movie.save()

    // response
    const comments = movie.comments
    return res.status(200).send({ message: 'Comment has been deleted', comments })

  } catch (error) {
    next(error)
  }
}

export default { create, update, remove }