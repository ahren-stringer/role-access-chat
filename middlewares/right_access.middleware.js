import jwt from 'jsonwebtoken'

export default (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // console.log(req.headers)
    let allow;
    if(req.headers['role-access']){
      allow = req.headers['role-access'].split(' ')[1] // "Access Alow?"
      // console.log(allow)
    }
    if(req.headers['right-access']){
      allow = req.headers['right-access'].split(' ')[1] // "Access Alow?"
      // console.log(allow)
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