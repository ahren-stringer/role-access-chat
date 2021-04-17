import express from 'express';
let { Router } = express;
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from  'jsonwebtoken'
import expressValidator from 'express-validator';
let { check, validationResult } = expressValidator;

const router = Router()

router.post(
    '/register', [
    check('email', 'Неправильный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов')
        .isLength({ min: 6 })
],
    async (req, res) => {
        try {

            // const errors = validationResult(req)
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({
            //         errors: errors.array(),
            //         message: 'Некоректные данные'
            //     })
            // }

            const { name, email, password } = req.body

            const condidate = await User.findOne({ email })
            if (condidate) {
                return res.status(400).json({ message: 'Такой пользователь уже существует' })
            }
            const hashedPassword = await bcrypt.hash(password, 12);

            const user = new User({
                name,
                email,
                password: hashedPassword,
                description: '',
                posts: [],
                coments: []
            });

            await user.save()
            res.status(201).json({ message: 'Пользователь зарегистрирован' })

        } catch (e) {
            res.status(500).json({ message: 'Ошибка регистрации' })
        }
    })

router.post(
    '/login', [
    check('email', 'Введите корректный email').normalizeEmail().isEmail(),
    check('password', 'Введите пароль').exists()
],
    async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Некоректные данные'
                })
            }

            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ message: 'Такого пользователя не существует' })
            }
            const isMatch = bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res, status(400).json({ message: 'Неверный пароль' })
            }

            const token = jwt.sign({ userId: user.id },
                'TopSecret', { expiresIn: '24h' }
            )
            console.log(user)
            res.json({
                token,
                userId: user.id,
                name: user.name,
                email: user.email,
                contacts:user.contacts,
                messages: user.messages,
                invites: user.invites,
                groups:user.groups 
            })
        } catch (e) {
            res.status(500).json({ message: 'Ошибка авторизации' })
        }
    })
    export default router