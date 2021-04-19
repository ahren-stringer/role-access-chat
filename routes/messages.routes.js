import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog.js'
import Message from '../models/Message.js'
import {io} from '../app.js'

router.post('/messages', async (req, res) => {
    try {
        let postData={
            text:req.body.text,
            chat: req.body.chat,
            user: req.body.user
        };
        let message= new Message(postData);
        await message.save()
        // .then((obj) => {
        //   obj.populate(
        //     "dialog",
        //     (err, message) => {
        //       if (err) {
        //         return res.status(500).json({
        //           status: "error",
        //           message: err,
        //         });
        //       }
  
        //       Dialog.findOneAndUpdate(
        //         { _id: postData.dialog },
        //         { lastMessage: message._id },
        //         { upsert: true },
        //         function (err) {
        //           if (err) {
        //             return res.status(500).json({
        //               status: "error",
        //               message: err,
        //             });
        //           }
        //         }
        //       );
  
        //       res.json(message);
        //     }
        //   );
        // })
        // .catch((reason) => {
        //   res.json(reason);
        // });
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})

router.get('/messages/:chat',  (req, res) => {

    Message.find({ chat: req.params.chat })
        .populate(['chat','user'])
        .exec((err, messages) => {
            if (err) return res.status(404).json({ message: "Сообщения не найдены" })
            return res.json(messages)
        });

})

router.delete('/messages/:id', async (req, res) => {
    try {
        await Message.findByIdAndRemove({_id:req.params.id});
        res.json({message: "Сообщение удалено"})
    } catch (e) {
        res.status(500).json({ message: 'Сообщение не найдено' })
    }
})
export default router