import Users_GroupRole from '../models/Users_GroupRoles.js'
import Right from '../models/Right.js'
import User from '../models/User.js'
export let defineRole = async (req, res, next) => {
  try {
    let user= await User.findById(req.user.userId)
    let role = await Users_GroupRole.findOne({
      user_name: user.name,
      group_id: req.params.groupId
    })

    req.role=role.role
    req.user=user
    console.log(req.role)
    console.log(req.user)
    next()

  } catch (e) {
    console.log(e)
    res.status(401).json({ message: 'Недостаточно прав' })
  }
}
export let rightCheck = async (req, res, next) => {
  try {
    let user= await User.findById(req.user.userId)
    let right = await Right.find({
      type: req.params.type,
      chanel_id: req.params.chanelId
    })
    if (
      !right.previlegion
      ||right.whitelisted && right.list.some(item => item == props.user_name)
      ||!right.whitelisted && !right.list.some(item => item == props.user_name)
      ||right.whitelisted && hightRolelist.some(item => item == props.user_name)
      ){
        next()
      }
      else{
        res.status(401).json({ message: 'Недостаточно прав' })
      }
  } catch (e) {
    console.log(e)
  }
}