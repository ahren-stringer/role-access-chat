import express from 'express';
const { Router } = express;
const router=Router()
import User from '../models/User.js'

router.get('/contacts/:userId', async (req, res) => {
        try {            
            const user = await User.findById(req.params.userId);
            let contacts = user.contacts;
            let arr=[];
            for(let i=0;i<contacts.length;i++){
                let contact=await User.findById(contacts[i])
            }
            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Ошибка пользователя' })
        }
    })
export default router