const logger = (req, res, next) => {
  console.log(`Incoming request: Method: ${req.method} - URL: ${req.url}`)
  next()
} 

export default logger