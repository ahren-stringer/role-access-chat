import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog.js'
import Group from '../models/Group.js'
import Message from '../models/Message.js'
import {io} from '../app.js'

router.post('/groups', async (req, res) => {
    try {
        const postData = {
            name:req.body.name,
            author: req.body.author,
            partners: req.body.partners,
          };
        let group = new Group(postData);
        group.save().then(() => {
            res.json(group);
          });
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})

router.get('/groups/:id', async(req, res) => {

    let groups=await Group.find().populate(['author']);
    let arr=[];
    for (let group of groups){
        if (group.author.id==req.params.id ) arr.push(group)
        for (let partner of group.partners){
            if (partner.id===req.params.id) arr.push(group)
        }
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
router.get('/single_group/:id', async(req, res) => {

    let group=await Group.findById(req.params.id).populate(['author']);
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