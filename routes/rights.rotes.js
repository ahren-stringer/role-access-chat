import express from 'express';
const { Router } = express;
const router = Router()
import Right from '../models/Right.js'

router.put('/right/update/:rightId', async (req, res) => {
    try {
        let right;
        if (req.body.prevelegion) {
            right=await Right.findByIdAndUpdate(
                req.params.rightId,
                {
                    list: req.body.list,
                    prevelegion: req.body.prevelegion,
                    whitelisted: req.body.whitelisted
                }
            );
        } else {
            right=await Right.findByIdAndUpdate(req.params.rightId, { list: req.body.list });
        }
        res.json(right)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
export default router