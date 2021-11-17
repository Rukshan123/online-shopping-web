import jwt from 'jsonwebtoken'
export const genarateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'somethingsecret',
    { expiresIn: '30d' }
  )
}

export const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization
  if (authorization) {
    //when use this function only get token part
    const token = authorization.slice(7, authorization.length) // Bearer XXXXXX
    jwt.verify(
      token,
      process.env.JWT_SECRET || 'somethingsecret',
      (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' })
        } else {
          // decode is information about user
          req.user = decode
          // pass user as property of req to next middleware
          next()
        }
      }
    )
  } else {
    res.status(401).send({ message: 'No Token' })
  }
}
