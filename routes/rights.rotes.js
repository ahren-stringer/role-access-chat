import express from 'express';
const { Router } = express;
const router = Router()
import Right from '../models/Right.js'
import {defineRole,rightCheck} from '../middlewares/right_access.middleware.js'
import auth from '../middlewares/auth.middleware.js'
import roleCheck from '../middlewares/roleCheck.js'

router.put('/right/update/:groupId/:rightId', async (req, res) => {
    try {
        let right;
        if (req.body.prevelegion) {
            // обозначаем список
            right=await Right.findByIdAndUpdate(
                req.params.rightId,
                {
                    list: req.body.list,
                    prevelegion: req.body.prevelegion,
                    whitelisted: req.body.whitelisted
                }
            );
        } else if (req.body.same){
            // доббавляем в существующий список
            right=await Right.findByIdAndUpdate(req.params.rightId, { $push: { list: req.body.list } });
        } else {
            // меняем список
            right=await Right.findByIdAndUpdate(req.params.rightId, { list: req.body.list });
        }
        res.json(right)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.put('/right/remove_user/:groupId/:rightId', async (req, res) => {
    try {
        let right=await Right.findByIdAndUpdate(
                req.params.rightId,
                {$pull: {list: req.body.user_name},}
            );
        res.json(right)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
export default router