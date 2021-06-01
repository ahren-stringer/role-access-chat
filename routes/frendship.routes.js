import express from 'express';
const { Router } = express;
const router = Router()
import Frendship from '../models/Frendship.js'

router.post('/make_invite', async (req, res) => {
    try {
        let invite = new Frendship({
            initiator: req.body.initiator,
            partner: req.body.partner,
        })
        await invite.save()
        res.json(invite)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.put('/frendship/:inviteId', async (req, res) => {
    try {
        await Frendship.updateOne(
            { _id: req.params.inviteId },
            { waiting: req.body.waiting }
        )
        res.json('Отправлено')
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.get('/friends/:userId', async (req, res) => {
    try {

        let friends = await Frendship.find({
            waiting: false,
            $or: [{ initiator: req.params.userId }, { partner: req.params.userId }]
        }).populate(['initiator', 'partner'])

        let invites = await Frendship.find({
            waiting: true,
            partner: req.params.userId
        }).populate(['initiator'])

        let waitings = await Frendship.find({
            waiting: true,
            initiator: req.params.userId
        }).populate(['partner'])

        res.json({friends,invites,waitings})

    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.get('/invites/:userId', async (req, res) => {
    try {
        let invites = await Frendship.find({
            waiting: true,
            partner: req.params.userId
        }).populate(['initiator', 'partner'])
        res.json(invites)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
router.get('/waitings/:userId', async (req, res) => {
    try {
        let waitings = await Frendship.find({
            waiting: true,
            initiator: req.params.userId
        }).populate(['initiator', 'partner'])
        res.json(waitings)
    } catch (e) {
        res.status(500).json({ message: 'Пользователь не найден' })
    }
})
export default router