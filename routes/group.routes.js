import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog.js'
import Group from '../models/Group.js'
import Users_GroupRole from '../models/Users_GroupRoles.js'
import access from '../middlewares/right_access.middleware.js'
import Right from '../models/Right.js'

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
router.put('/group_add_user/:groupId',access, async (req, res) => {
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
router.delete('/group_delete_user/:groupId',access, async (req, res) => {
    try {
        await Group.updateOne({ _id: req.params.groupId },
            {
                $pullAll: { partners: [req.body.deleter] },
            });
        await Users_GroupRole.remove({
            user_name:req.body.deleter,
            group_id:req.params.groupId
        })
        await Right.updateMany({
            group_id:req.body.groupId,
            prevelegion:true
        },
        {
            $pullAll: { list: req.body.deleter },
        })
        res.json({ message: "Пользователь Удален" })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
export default router