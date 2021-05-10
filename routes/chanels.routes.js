import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog.js'
import Chanel from '../models/Chanel.js'
import Right from '../models/Right.js'

router.post('/chanels', async (req, res) => {
    try {
        let chanel = new Chanel({
            name: req.body.name,
            author: req.body.author,
            group: req.body.group,
        });
        console.log(chanel)
        let arr = [];
        arr.push({...req.body.canSee, chanel_id: chanel._id})
        arr.push({...req.body.canWrite, chanel_id: chanel._id})
        arr.push({...req.body.canSeeHistory, chanel_id: chanel._id})
        arr.push({...req.body.canSendFile, chanel_id: chanel._id})
        arr.push({...req.body.canAddUsers, chanel_id: chanel._id})
        arr.push({...req.body.canDeleteUsers, chanel_id: chanel._id})
        let savedArr = []
        for (let item of arr) {
            console.log(item)
            let r=new Right(item)
            let right = await r.save()
            savedArr.push(right)
        }

        chanel.canSee=savedArr[0]._id
        chanel.canWrite=savedArr[1]._id
        chanel.canSeeHistory=savedArr[2]._id
        chanel.canSendFile=savedArr[3]._id
        chanel.canAddUsers=savedArr[4]._id
        chanel.canDeleteUsers=savedArr[5]._id

        chanel.save().then(() => {
            res.json({chanel,rights:savedArr});
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Канал не создан' })
    }
})

router.get('/chanels/:id', async (req, res) => {

    let chanels = await Chanel
        .find({ group: req.params.id })
        .populate(['author', 'group',"canSee",'canWrite','canSeeHistory','canSendFile','canAddUsers','canDeleteUsers']);
    res.json(chanels)
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
router.get('/single_chanel/:id', async (req, res) => {

    let group = await Chanel.findById(req.params.id).populate(['author', 'group']);
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
export default router