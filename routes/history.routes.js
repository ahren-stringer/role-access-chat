import express from 'express';
const { Router } = express;
const router = Router()
import File from '../models/File.js'
import path from 'path';
import {__dirname} from '../app.js'

router.get('/history/:chanelId', async (req, res) => {
    try {
        let history=await File.find({chat:req.params.chanelId})
        res.json(history)
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
export default router