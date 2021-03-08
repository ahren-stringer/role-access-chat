import express from 'express';
const { Router } = express;
const router=Router()
import User from '../models/User.js'

router.get('/profile/:userId', async (req, res) => {
        try { 
            console.log(req.params.userId)           
            const user = await User.findById(req.params.userId);
            console.log(user)
            res.json(user)
        } catch (e) {
            res.status(500).json({ message: 'Ошибка пользователя' })
        }
    })
export default router