import expess from 'express'
import mongoose from 'mongoose'
import Cors from "cors"
import auth from './routes/auth.routes.js'
import messages from './routes/messages.routes.js'
import users from './routes/users.routes.js'
import dialogs from './routes/dialogs.routes.js'
import groups from './routes/group.routes.js'
import httpServer from "http"
import * as socket from "socket.io"
import Group from './models/Group.js'
// import updateLastSeen from  './middlewares/updateLastSeen.js'
// import checkAuth from  './middlewares/checkAuth.js'
// import category from  './routes/category.routes.js'

//API Config
let app = expess();
const http = httpServer.createServer(app);
export let io = new socket.Server(http
  , {
    cors: {
      origin: "http://localhost:3000",
    },
  }
);
const port = process.env.PORT || 8001;
const connection_url = 'mongodb://localhost:27017/role_acces_chat'
'mongodb+srv://Pavel:4xSzHb2SeAdAydKR@cluster0.xwykf.mongodb.net/role_access_chat?retryWrites=true&w=majority'

//Middlewares
app.use(expess.json())
app.use(Cors())
// app.use(updateLastSeen)
// app.use(checkAuth)
// Авторизация
app.use('', auth)
//     Сообщения
app.use('', messages)
// Пользователи
app.use('', users)
//     Диалоги
app.use('', dialogs)
//     Диалоги
app.use('', groups)
let groupId;
io.on('connection', async (socket) => {
  socket.emit("test comand", '1111111111111');
  console.log('jjjjjjjjj')
  socket.on('userId', async (userId) => {
    let groups = await Group.find();
    console.log(groups)
    let arr = [];
    for (let group of groups) {
      console.log(group.author)
      console.log(userId)
      if (group.author == userId) arr.push(group)
      for (let partner of group.partners) {
        if (partner.id === userId) arr.push(group)
      }
    }
    socket.emit("groups", arr);
    const users = [];
    for (let [id, socket] of io.of("/").sockets) {
      users.push({
        userID: id,
        username: socket.username,
      });
    }
    socket.emit("users", users);
    // arr.forEach(group => {
    //   io.of("/"+group._id).on("connection", (socket) => {
    //     socket.emit()
    //   });
    // });
  })
  socket.on("FIND:GROUP", Id => {
    console.log("group: ", Id)
    groupId = Id
  })
});
// io.of('/'+groupId).on('connection', socket=>{
//   console.log('ppp')
//   socket.emit("test comand", 'pppppppppp');
//   socket.on("NEW:MESSAGE", mess=>{
//   console.log(mess)
// })
// })
const workspaces = io.of(/^\/\w+$/);

workspaces.on("connection", socket => {
  // const workspace = socket.nsp;
  socket.emit("test comand", 'pppppppppp');
  socket.on("NEW:MESSAGE", mess => {
    console.log(mess)
    socket.emit("MESSAGE", mess);
  })
});
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

http.listen(port, () => console.log('Server Starts on localhost', port))
