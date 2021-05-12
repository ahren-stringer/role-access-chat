import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog.js'
import Group from '../models/Group.js'
import Users_GroupRole from '../models/Users_GroupRoles.js'

router.post('/groups', async (req, res) => {
    try {
        console.log(req.body)
        const postData = {
            name: req.body.name,
            author: req.body.author,
            partners: req.body.partners,
        };
        let group = new Group(postData);
        let savedGroup= await group.save()
        let arr=[]
        for (let role of req.body.roles){
            arr.push({...role,group_id:savedGroup._id})
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
        // for (let moderator of group.moderators) {
        //     if ( moderator=== req.params.id) arr.push(group)
        // }
    }
    res.json(arr)
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
router.put('/group/update/:role/:id', async (req, res) => {
    try {
        console.log('llllllllllllll')
        await Group.updateOne({ _id: req.params.id },
            {
                $pullAll: { admins: req.body.list },
            });
        // await Group.updateOne({ _id: req.params.id },
        //     {
        //         $pullAll: { partners: req.body.list },
        //     });
        await Group.updateOne({ _id: req.params.id },
            {
                $pullAll: { moderators: req.body.list },
            });
        await Group.updateOne({ _id: req.params.id },
            {
                $pullAll: { invited: req.body.list },
            });
        await Group.updateOne({ _id: req.params.id },
            {
                $addToSet: { [req.params.role]: req.body.list }
            });
        res.json({ message: "Пользователь удален" })
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
export default router