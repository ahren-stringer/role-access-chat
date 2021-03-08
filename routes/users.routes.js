import express from 'express';
const { Router } = express;
const router=Router()
import User from '../models/User.js'

router.get('/users', async (req, res) => {
        try {            
            const users = await User.find();
            res.json(users)
        } catch (e) {
            res.status(500).json({ message: 'Ошибка пользователя' })
        }
    })
export default router