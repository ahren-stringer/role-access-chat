import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    let allow;
    if(req.headers['group']){
      allow = req.headers['group']
    }
    if(req.headers['right-access']){
      allow = req.headers['right-access'].split(' ')[1] // "Access Alow?"
    }
    if (!allow) {
      console.log('Недостаточно прав')
      return res.status(401).json({ message: 'Недостаточно прав' })
    }
    const decoded = jwt.verify(allow, 'RightSecret')
    req.user = decoded
    
    next()

  } catch (e) {
    console.log(e)
    res.status(401).json({ message: 'Недостаточно прав' })
  }
}