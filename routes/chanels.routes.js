import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog.js'
import Chanel from '../models/Chanel.js'
import Right from '../models/Right.js'
import jwt from 'jsonwebtoken'
import Users_GroupRole from '../models/Users_GroupRoles.js'
import { defineRole, rightCheck } from '../middlewares/right_access.middleware.js'
import auth from '../middlewares/auth.middleware.js'
import roleCheck from '../middlewares/roleCheck.js'

router.post('/chanels/:groupId',
    auth,defineRole,
    async (req, res) => {
        try {
            // if(!roleCheck(req.role,['owner','admin','moderator'])) return res.status(401).json({ message: 'Недостаточно прав' })
            let chanelObj = new Chanel({
                name: req.body.name,
                author: req.body.author,
                group: req.body.group,
            });
            let chanel = await chanelObj.save();
            // console.log(chanel)
            let arr = [];
            // let hightRoleList = await Users_GroupRole.find({
            //     group_id: req.body.group,
            //     $or: [{ role: 'owner' }, { role: 'admin' }],
            // })
            let users_GroupRoles = await Users_GroupRole.find({ group_id: req.body.group })
            let hightRoleList = users_GroupRoles
                .filter(item => item.role==='owner'||item.role==='admin'||(item.role=='moderator'&&item.role==req.role))
                .map(item => item.user_name)
            // if (req.role == 'moderator') hightRoleList.push(req.user.name)
            let list=users_GroupRoles
            .filter(item => item.role==='partner'||(item.role=='moderator'&&item.role!==req.role))
            .map(item => item.user_name)
            arr.push({ ...req.body.canSee, chanel_id: chanel._id, hightRoleList, list })
            arr.push({ ...req.body.canWrite, chanel_id: chanel._id, hightRoleList, list })
            // arr.push({ ...req.body.canSeeHistory, chanel_id: chanel._id, hightRoleList })
            arr.push({ ...req.body.canSendFile, chanel_id: chanel._id, hightRoleList, list:[]})
            let savedArr = [];
            for (let item of arr) {
                // console.log(item)
                let r = new Right(item)
                let right = await r.save()
                savedArr.push(right)
            }
            chanel.canSee = savedArr[0]._id
            chanel.canWrite = savedArr[1]._id
            // chanel.canSeeHistory = savedArr[2]._id
            chanel.canSendFile = savedArr[2]._id
            chanel.save().then(() => {
                res.json({ chanel, rights: savedArr });
            });
        } catch (e) {
            console.log(e)
            res.status(500).json({ message: 'Канал не создан' })
        }
    })

router.get('/chanels/:user/:groupName/:id', auth, rightCheck, async (req, res) => {
    try {
        let chanels = await Chanel
            .find({ group: req.params.id })
            .populate(['author', 'group', "canSee", 'canWrite', 'canSeeHistory', 'canSendFile']);

        let rights_in_all_chanels_in_group = await Right.find({ group_id: req.params.id }).populate(['chanel_id']);
        let right_keys_obj = {};
        for (let right of rights_in_all_chanels_in_group) {
            if (!right_keys_obj[right.chanel_id.name]) {
                right_keys_obj[right.chanel_id.name] = {}
            }

            let inList = right.list.some(item => item == req.params.user)
            if ((!right.prevelegion && inList)
                || (right.whitelisted && inList)
                || (!right.whitelisted && !inList)) {
                right_keys_obj[right.chanel_id.name] = {
                    ...right_keys_obj[right.chanel_id.name],
                    [right.type]: jwt.sign(
                        {
                            user: req.params.user,
                            right: right.type
                        },
                        'RightSecret'
                    )
                }
            }

        }
        // console.log({ [req.params.groupName]: right_keys_obj })
        res.json({ chanels, [req.params.groupName]: right_keys_obj })
    } catch (e) {
        console.log(e)
    }
})
// .or([{ author: req.params.id }, { partner: req.params.id }])
// await arr.populate(['author'])
// .populate({
//     path: 'partners',
//     populate: {
//       path: 'id',
//     },
//   })
// .exec((err, group) => {
//     if (err) {
//         console.log(err)
//         return res.status(404).json({ message: "Группа не найдена" })
//     }
//     return res.json(group)
// });
router.get('/single_chanel/:id',
    // auth,rightCheck,
    async (req, res) => {

        let group = await Chanel.findById(req.params.id).populate(['author', 'group', "canSee", 'canWrite', 'canSeeHistory', 'canSendFile', 'canAddUsers', 'canDeleteUsers']);
        res.json(group)
    })
router.put('/invited_can_see/:groupId/:id', auth, defineRole, async (req, res) => {

    let group = await Chanel.findOneAndUpdate(
        { _id: req.params.id },
        { invitedCanSee: req.body.invitedCanSee }
    )

    res.json(group)
})

router.put('/chanel_rename/:groupId/:chanelId', auth, defineRole, async (req, res) => {
    try {
        await Chanel.updateOne(
            { _id: req.params.chanelId },
            { name: req.body.name }
        );
        res.json({ message: "Название изменено" })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})

router.delete('/delete_chanel/:id', async (req, res) => {
    try {
        await Chanel.findByIdAndRemove({ _id: req.params.id });
        res.json({ message: "Чат удален удален" })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
export default router