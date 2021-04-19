import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Router, withRouter } from 'react-router-dom';
import './App.css';
import { useRotes } from './HOC/routes';
import { setProfile, setLogin, setLoaded, setToken } from './redux/authReduser'
import { io } from "socket.io-client";
export const socket = io('http://localhost:8001', { autoConnect: false });



function App(props) {
  socket.on('test comand', data => {
    console.log("connected: " + JSON.stringify(data))
  })
  let [token, setToken] = useState(props.token)
  let [users, setUsers]=useState([])
  let usersArr=['User1','User2','User3'];
  useEffect(async () => {
    const data = JSON.parse(localStorage.getItem('userData'))
    let req;
    if (data && data.token) {
      req = await axios.get('http://localhost:8001/users/' + data.id)
      props.setProfile(data.token, data.id,
        req.data.name,
        req.data.email,
      )
      socket.auth = { username: req.data.name };
    socket.connect();
    // socket.on('updatechat', function (username, data) {
    //   console.log(username, data)
    // });
    await socket.emit('userId',data.id)
    // socket.emit("adduser", req.data.name);
    socket.on('groups', data => {
      // console.log(data)
    })
    socket.on("users", (users) => {
      users.forEach((user) => {
        user.self = user.userID === socket.id;
        console.log(user);
      });
      // put the current user first, and then sort by username
      users=users.sort((a, b) => {
        if (a.username < b.username) return -1;
        return a.username > b.username ? 1 : 0;
      })
      console.log(users)
      for (let user of usersArr){
        for(let socketUser of users){
          if (user==socketUser.username){
            socket.emit("private message", {
              content:'aaaaaaaaaaaaa',
              to: socketUser.userID,
            });
            console.log('сообщение отправлено к ',socketUser.username)
            socket.on("private message", ({ content, from }) => {
              console.log(content,' от ', from)
            });
          }
        }
      }
      
    });
    socket.on("user connected", (user) => {
      console.log(user,'conected');
      setUsers(users.push(user))
    });
    
    // socket.on('users', data => {
    //   console.log(data)
    // })
    }
  }, []);

  // useEffect(()=>{
  //   setToken(props.token)
  // },[props.token])
  let routes = useRotes(!!props.token)
  // if (!props.loaded) return <Preloader/>
  return <div>
    <BrowserRouter>
      {/* {isAuth && <Navbar/>} */}
      <div className='container'>
        {routes}
      </div>
    </BrowserRouter>
  </div>
}

let mapStateToProps = (state) => {
  return {
    loaded: state.auth.loaded,
    token: state.auth.token,
    userId: state.auth.userId,
  }
}

export default connect(mapStateToProps, { setProfile, setLogin, setLoaded, setToken })(App);
 // const login = useCallback(( token, id, name, email, contacts, messages, invites, groups) => {
  //   props.setProfile(token, id, name, email, contacts, messages, invites, groups)
  //   localStorage.setItem('userData', JSON.stringify({ id: id, token: token }))
  // }, []);

  // props.setLogin(login)

  // useEffect(async () => {
  //   const data = JSON.parse(localStorage.getItem('userData'))
  //   debugger
  //   if (data && data.token) {
  //     let req = await axios.get('http://localhost:8001/profile/'+data.id)
  //     login(data.token, data.userId,
  //       req.data.name,
  //       req.data.email,
  //       req.data.contacts,
  //       req.data.messages,
  //       req.data.invites,
  //       req.data.groups
  //     )
  //   }
  //   props.setLoaded(true)
  //   debugger
  // }, [login]);

  // let routes = useRotes(!!props.token)
  // console.log(props.loaded)
  // debugger