import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    console.log(req.headers)
    const allow = req.headers['role-access'].split(' ')[1] // "Access Alow?"

    if (!allow) {
      console.log('Недостаточно прав')
      return res.status(401).json({ message: 'Недостаточно прав' })
    }
    const decoded = jwt.verify(allow, 'Role_Secret')
    req.user = decoded
    
    next()

  } catch (e) {
    console.log(e)
    res.status(401).json({ message: 'Недостаточно прав' })
  }
}