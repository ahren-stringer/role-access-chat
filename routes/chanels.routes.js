import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog.js'
import Group from '../models/Group.js'
import Chanel from '../models/Chanel.js'
import Message from '../models/Message.js'
import { io } from '../app.js'

router.post('/chanel', async (req, res) => {
    try {
        const postData = {
            name: req.body.name,
            author: req.body.author,
            group: req.body.group,
            rights: req.body.rights,
        };
        let chanel = new Chanel(postData);
        chanel.save().then(() => {
            res.json(chanel);
            // io.emit('SERVER:NEW_GROUP_CREATED', {
            //   ...postData,
            //   dialog: dialogObj,
            // });
        });
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Канал не создан' })
    }
})

router.get('/chanel/:id', async (req, res) => {

    let chanels = await Group
    .find({group: req.params.group})
    .populate(['author','group']);
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
export default router