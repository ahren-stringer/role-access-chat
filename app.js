import expess from 'express'
import mongoose from 'mongoose'
import Cors from "cors"
import auth from './routes/auth.routes.js'
import messages from './routes/messages.routes.js'
import users from './routes/users.routes.js'
import dialogs from './routes/dialogs.routes.js'
import updateLastSeen from './middlewares/updateLastSeen.js'
import checkAuth from './middlewares/checkAuth.js'
// import category from './routes/category.routes.js'

//API Config
const app = expess();
const port = process.env.PORT || 8001;
const connection_url =  'mongodb://localhost:27017/role_acces_chat'
'mongodb+srv://Pavel:4xSzHb2SeAdAydKR@cluster0.xwykf.mongodb.net/role_access_chat?retryWrites=true&w=majority'

//Middlewares
app.use(expess.json())
app.use(Cors())
app.use(updateLastSeen)
app.use(checkAuth)
// Авторизация
app.use('', auth)
//     Сообщения
app.use('', messages)
// Пользователи
app.use('', users)
//     Диалоги
app.use('', dialogs)

//DB Config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

})

mongoose.connection.on('error', err => {
    console.log(err);
});

if (process.env.NODE_ENV === 'production') {
    app.use(expess.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
//Listener

app.listen(port, () => console.log('Server Starts on localhost', port))