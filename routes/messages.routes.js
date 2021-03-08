import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog.js'
import Message from '../models/Message.js'

router.post('/messages', async (req, res) => {
    try {
        let postData={
            text:req.body.text,
            dialog: req.body.dialogId,
            user: '601887aacb760c17b061c499'
        };
        let message= new Message(postData);
        await message.save()
        res.json(message)

    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})

router.get('/messages',  (req, res) => {

    Message.find({ dialog: req.query.dialog })
        .populate(['dialog'])
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