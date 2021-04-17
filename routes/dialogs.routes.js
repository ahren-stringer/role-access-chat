import express from 'express';
const { Router } = express;
const router = Router()
import Dialog from '../models/Dialog.js'
import Message from '../models/Message.js'
import {io} from '../app.js'

router.post('/dialogs', async (req, res) => {
    try {
        const postData = {
            author: req.body.author,
            partner: req.body.partner,
          };
        let { author, partner, text } = req.body;
        let dialog = new Dialog({ author, partner });
        let dialogObj = await dialog.save();
        let message = new Message({
            text: text,
            user: author,
            dialog: dialogObj._id
        });
        let messageObj = await message.save()

        dialogObj.lastMessage = message._id;

        dialogObj.save().then(() => {
            res.json(dialogObj);
            io.emit('SERVER:DIALOG_CREATED', {
              ...postData,
              dialog: dialogObj,
            });
          });
        // res.json({
        //     dialog: dialogObj,
        //     message: messageObj
        // })
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})

// router.get("/dialogs",(req, res) => {

//     const authorId='60466787c8aed7205086d49d';

//     Dialog.find({author: authorId})
//     //   .or([{ author: userId }, { partner: userId }])
//       .populate(['author', 'partner'])
//     //   .populate({
//     //     path: 'lastMessage',
//     //     populate: {
//     //       path: 'user',
//     //     },
//     //   })
//       .exec(function (err, dialogs) {
//         if (err) {
//           return res.status(404).json({
//             message: 'Dialogs not found',
//           });
//         }
//         return res.json(dialogs);
//       });
//   });

router.get('/dialogs/:id', (req, res) => {

    Dialog.find()
        .or([{ author: req.params.id }, { partner: req.params.id }])
        .populate(['author', 'partner'])
        .populate({
            path: 'lastMessage',
            populate: {
              path: 'user',
            },
          })
        .exec((err, dialog) => {
            if (err) {
                console.log(err)
                return res.status(404).json({ message: "Диалог не найден" })
            }
            return res.json(dialog)
        });

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