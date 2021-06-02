import express from 'express';
const { Router } = express;
const router = Router()
import path from 'path';
import {__dirname} from '../app.js'
import {defineRole,rightCheck} from '../middlewares/right_access.middleware.js'
import auth from '../middlewares/auth.middleware.js'
import roleCheck from '../middlewares/roleCheck.js'

router.get('/file/public/:destination/:filename', async (req, res) => {
    try {
        console.log(__dirname)
        let filePath=__dirname+'\\public\\'+req.params.destination +'\\'+req.params.filename
        console.log(path)
        res.sendFile(path.normalize(filePath))
    } catch (e) {
        console.log(e)
        res.status(500).json({ message: 'Что-то пошло не так' })
    }
})
export default router