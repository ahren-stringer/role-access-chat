import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Router, withRouter } from 'react-router-dom';
import './App.css';
import { useRotes } from './HOC/routes';
import { setProfile, setLogin, setLoaded, setToken } from './redux/authReduser'
import { io } from "socket.io-client";
export const socket = io('http://localhost:8001', { autoConnect: false });
export let socketGroup = io('http://localhost:8001/607a010120bf033ef4d57be1', { autoConnect: false });
// const socketG=io('http://localhost:8001/ppp');
socket.on('test comand', data => {
  console.log("connected: " + JSON.stringify(data))
})
socket.auth = { username:'User1' };
socket.connect();
// socketG.on('test comand', data => {
//   console.log("connected: " + JSON.stringify(data))
// })
function App(props) {

  let [token, setToken] = useState(props.token)

  useEffect(async () => {
    const data = JSON.parse(localStorage.getItem('userData'))
    if (data && data.token) {
      let req = await axios.get('http://localhost:8001/users/' + data.id)
      props.setProfile(data.token, data.id,
        req.data.name,
        req.data.email,
      )
    }
    socket.emit('userId',data.id)
    socket.on('groups', data => {
      console.log(data)
    })
    socket.on('users', data => {
      console.log(data)
    })
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