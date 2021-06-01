import Users_GroupRole from '../models/Users_GroupRoles.js'
import Right from '../models/Right.js'
import User from '../models/User.js'
export let roleCheck = async (req, res, next) => {
  try {
    let user= await User.findById(req.user.id)
    let role = await Users_GroupRole.find({
      user_name: user.name,
      group_id: req.params.groupId
    })

    req.role=role

    next()

  } catch (e) {
    console.log(e)
    res.status(401).json({ message: 'Недостаточно прав' })
  }
}
export let rightCheck = async (req, res, next) => {
  try {
    let user= await User.findById(req.user.id)
    let role = await Right.find({
      type: req.params.type,
      chanel_id: req.params.chanelId
    })
    if (
      !role.previlegion
      ||role.whitelisted && role.list.some(item => item == props.user_name)
      ||role.blacklisted && !role.list.some(item => item == props.user_name)
      ||role.whitelisted && hightRolelist.some(item => item == props.user_name)
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