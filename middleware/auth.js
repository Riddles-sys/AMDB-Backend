import jwt from 'jsonwebtoken'
import CONSTS from '../consts.js'
import UserModel from '../models/user.js'

const auth = async (req, res, next) => {
  const rawToken = req.headers.authorization
  // console.log('HEADERS', req.headers)

  if (!rawToken) {
    return res
      .status(401)
      .json({ message: 'Unauthorized - No has been token provided.' })
  }

  const token = rawToken.split(' ')[1]

  try {
    const decodedToken = jwt.verify(token, CONSTS.JWT_SECRET)

    const authUser = await UserModel.findOne({
      userName: decodedToken.userName,
    })

    if (!authUser) {
      return res.status(401).json({
        message: 'Token affiliated with user that does not exist anymore.',
      })
    }

    req.currentUser = authUser
    // console.log(req.currentUser)
    next()
  } catch (error) {
    next(error)
  }
}

export default auth
