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

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = ['first','room2','room3'];

io.on('connection', async (socket) => {
  socket.emit("test comand", '1111111111111');
  console.log('jjjjjjjjj')
  await socket.on('userId', async (Id) => {
    let groups = await Group.find();
    let arr = [];
    for (let group of groups) {
      if (group.author == Id) arr.push(group)
      for (let partner of group.partners) {
        if (partner.id === Id) arr.push(group)
      }
    }
    socket.emit("groups", arr);
  })
  const users = [];
  for (let [id, socket] of io.of("/").sockets) {
    users.push({
      userID: id,
      username: socket.username,
    });
  }
  socket.emit("users", users);
  socket.broadcast.emit("user connected", {
    userID: socket.id,
    username: socket.username,
  });
  socket.on("private message", ({ content, to }) => {
    socket.to(to).emit("private message", {
      content,
      from: socket.username,
    });
  });
  // when the client emits 'adduser', this listens and executes
// when the client emits 'adduser', this listens and executes
socket.on('adduser', function(username){
  // store the username in the socket session for this client
  socket.username = username;
  // store the room name in the socket session for this client
  socket.room = 'first';
  // add the client's username to the global list
  usernames[username] = username;
  // send client to room 1
  socket.join('first');
  // echo to client they've connected
  socket.emit('updatechat', 'SERVER', 'you have connected to first');
  // echo to room 1 that a person has connected to their room
  socket.broadcast.to('first').emit('updatechat', 'SERVER', username + ' has connected to this room');
  socket.emit('updaterooms', rooms, 'first');
});

// when the client emits 'sendchat', this listens and executes
socket.on('sendchat', function (data) {
  // we tell the client to execute 'updatechat' with 2 parameters
  io.sockets.in(socket.room).emit('updatechat', socket.username, data);
});

socket.on('switchRoom', function(newroom){
  // leave the current room (stored in session)
  socket.leave(socket.room);
  // join new room, received as function parameter
  socket.join(newroom);
  socket.emit('updatechat', 'SERVER', 'you have connected to '+ newroom);
  // sent message to OLD room
  socket.broadcast.to(socket.room).emit('updatechat', 'SERVER', socket.username+' has left this room');
  // update socket session room title
  socket.room = newroom;
  socket.broadcast.to(newroom).emit('updatechat', 'SERVER', socket.username+' has joined this room');
  socket.emit('updaterooms', rooms, newroom);
});

// when the user disconnects.. perform this
socket.on('disconnect', function(){
  // remove the username from global usernames list
  delete usernames[socket.username];
  // update list of users in chat, client-side
  io.sockets.emit('updateusers', usernames);
  // echo globally that this client has left
  socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
  socket.leave(socket.room);
});
 
});
io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  console.log(username)
  next();
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
