const errorHandler = (error, req, res, next) => {
  console.log(`Server side error: ${error}`)
  console.log(`Name of the error: ${error.name}`)
  if (error.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid Object ID.' })
  }
  if (error.name === 'JWT Error') {
    return res.status(401).json({ message: 'Invalid JWT' })
  }

  return res.status(500).json({ message: 'Something went wrong' })
}

export default errorHandler
