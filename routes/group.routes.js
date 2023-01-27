import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog.js'
import Group from '../models/Group.js'
import Users_GroupRole from '../models/Users_GroupRoles.js'
import Right from '../models/Right.js'
import {defineRole,rightCheck} from '../middlewares/right_access.middleware.js'
import auth from '../middlewares/auth.middleware.js'
import roleCheck from '../middlewares/roleCheck.js'

router.post('/groups', async (req, res) => {
    try {
        console.log(req.body)
        const postData = {
            name: req.body.name,
            author: req.body.author,
            partners: req.body.partners,
        };
        let group = new Group(postData);
        let savedGroup = await group.save()
        let arr = []
        for (let role of req.body.roles) {
            arr.push({ ...role, group_id: savedGroup._id })
        }
        console.log(arr)
        await Users_GroupRole.insertMany(arr)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})

router.get('/groups/:id', async (req, res) => {
    let groups = await Group.find().populate(['author']);
    let arr = [];
    for (let group of groups) {
        if (group.author.name == req.params.id) arr.push(group)
        for (let partner of group.partners) {
            if (partner === req.params.id) arr.push(group)
        }
    }
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.json(arr)
})
router.get('/single_group/:id', async (req, res) => {

    let group = await Group.findById(req.params.id).populate(['author']);
    res.json(group)
})

router.delete('/dialogs/:id', async (req, res) => {
    try {
        await Dialog.findByIdAndRemove({ _id: req.params.id });
        res.json({ message: "Пользователь удален" })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.put('/group_add_user/:groupId',
// access, 
async (req, res) => {
    try {
        await Group.updateOne({ _id: req.params.groupId },
            {
                $addToSet: { partners: req.body.new_parters },
            });
        await Users_GroupRole.insertMany(req.body.roles)
        res.json({ message: "Пользователь добавлен" })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})

router.put('/group_rename/:groupId',auth,defineRole, async (req, res) => {
    try {
        await Group.updateOne(
            { _id: req.params.groupId },
            {name: req.body.name  }
            );
        res.json({ message: "Название изменено" })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})

router.delete('/group_delete_user/:userName/:groupId',
auth,defineRole,
 async (req, res) => {
    try {
        if(!roleCheck(req.role,['owner','admin'])) return res.status(401).json({ message: 'Недостаточно прав' })
        // if(req.user.role!=='admin' || req.user.role!=='owner'){
        //     res.json({ message: 'Недостаточно прав' })
        //     return
        // }
        await Group.updateOne({ _id: req.params.groupId },
            {
                $pullAll: { partners: [req.params.userName] },
            });
        await Users_GroupRole.deleteOne({
            user_name:req.params.userName,
            group_id:req.params.groupId
        })
        await Right.updateMany({
            group_id:req.body.groupId,
            prevelegion:true
        },
        {
            $pullAll: { list: [req.params.userName] },
        })
        res.json({ message: "Пользователь Удален" })

    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
export default router