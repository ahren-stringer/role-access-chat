import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {

    const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"

    if (!token) {
      return res.status(401).json({ message: 'Нет' })
    }

    const decoded = jwt.verify(token, 'TopSecret')
    req.user = decoded
    next()

  } catch (e) {
    console.log(e)
    res.status(401).json({ message: 'Нет авторизации' })
  }
}