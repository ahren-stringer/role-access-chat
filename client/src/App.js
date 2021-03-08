import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Router, withRouter } from 'react-router-dom';
import './App.css';
import Auth from './Components/Auth/Auth';
import Register from './Components/Auth/Register';
import Main from './Components/Main/Main';
import Preloader from './Components/Preloader/Preloader';
import { useRotes } from './HOC/routes';
import { setProfile, setLogin, setLoaded, setToken } from './redux/authReduser'

function App(props) {

  let [token, setToken] = useState(props.token)

  useEffect(async () => {
    const data = JSON.parse(localStorage.getItem('userData'))
    if (data && data.token) {
      let req = await axios.get('http://localhost:8001/profile/' + data.id)
      props.setProfile(data.token, data.id,
        req.data.name,
        req.data.email,
        req.data.contacts,
        req.data.messages,
        req.data.invites,
        req.data.groups
      )
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
    // name: state.auth.name,
    // email: state.auth.email,
    // contacts: state.auth.contacts,
    // messages: state.auth.messages,
    // invites: state.auth.invites,
    // groups: state.auth.groups
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