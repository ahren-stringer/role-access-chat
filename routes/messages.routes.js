import express from 'express';
const { Router } = express;
const router = Router()
import Message from '../models/Message.js'
import File from '../models/File.js'
import {defineRole,rightCheck} from '../middlewares/right_access.middleware.js'
import auth from '../middlewares/auth.middleware.js'
import roleCheck from '../middlewares/roleCheck.js'
import multer from 'multer';
import path from "path";

const storage = multer.diskStorage({
    destination: "./public/files/",
    filename: function (req, file, cb) {
        cb(null, "FILE-" + Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 100000000 },
}).array("files");

const obj = (req, res) => {
    upload(req, res, async() => {
        // console.log("Request ---", req.body);
        // console.log("Request file ---", req.files);
        let filesArr = req.files.map(item => new File({ file: item }))
        console.log(filesArr)
        let message = new Message({
            text: req.body.text,
            chat: req.body.chat,
            user: req.body.user,
            files:filesArr
        });
        await File.insertMany(filesArr)
        await message.save(message)
        let m = await Message.findById(message._id).populate(['chat', 'user','files'])
        res.json(m)
        // const categories = req.
        //  new PostCategory({ img: req.file, category });
        // categories.save().then(() => {
        //     res.send({ message: "uploaded successfully" })
        // })
    });
}

router.post('/messages/:chanelId', obj
    // async (req, res) => {
    //     try {
    //         let postData={
    //             text:req.body.text,
    //             chat: req.body.chat,
    //             user: req.body.user
    //         };
    //         let message= new Message(postData);
    //         let m=await Message.findById(message._id).populate(['chat', 'user'])
    //         res.json( m)
    //     } catch (e) {
    //         res.status(500).json({ message: 'Пользователь не найден' })
    //     }
    // }
)

router.get('/messages/:type/:chat', 
// auth,rightCheck, 
(req, res) => {

    Message.find({ chat: req.params.chat })
        .populate(['chat', 'user','files'])
        .exec((err, messages) => {
            if (err) return res.status(404).json({ message: "Сообщения не найдены" })
            return res.json(messages)
        });

})

router.delete('/messages/:id', async (req, res) => {
    try {
        await Message.findByIdAndRemove({ _id: req.params.id });
        res.json({ message: "Сообщение удалено" })
    } catch (e) {
        res.status(500).json({ message: 'Сообщение не найдено' })
    }
})
export default router