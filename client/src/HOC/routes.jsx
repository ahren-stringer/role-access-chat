import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Auth from '../Components/Auth/Auth'
import Register from '../Components/Auth/Register'
import Main from '../Components/Main/Main'
import Users from '../Components/Users/Users'
import Preloader from '../Components/Preloader/Preloader';

export const useRotes=(isAuth)=>{
 if (isAuth){
    return (<Switch>
        <Route path='/chat/:chatId?' exact>
            <Main/>
        </Route>
        <Route path='/users' exact>
            <Users/>
        </Route>
        <Redirect to='/chat'/>
    </Switch>)
 }

 return <Switch>
     <Route path='/' exact>
        <Auth/>
     </Route>
     <Route path='/register' exact>
        <Register/>
     </Route>
     <Redirect to='/'/>
 </Switch>

}
// let mapStateToProps = (state) => {
//     return {
//       loaded: state.auth.loaded,
//     }
//   }
  
//   export default connect(mapStateToProps, { setLoaded })(useRotes);