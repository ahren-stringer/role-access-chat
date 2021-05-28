import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import Auth from '../Components/Auth/Auth'
import Register from '../Components/Auth/Register'
import Main from '../Components/Main/Main'
import Users from '../Components/Users/Users'
import Preloader from '../Components/Preloader/Preloader';
// import CreateGroup from '../Components/Create/CreateGroup'

export const useRotes=(isAuth)=>{
 if (isAuth){
    return (<Switch>
        <Route path='/chat/:groupId?/:chanelId?' exact>
            <Main/>
        </Route>
        <Route path='/users' exact>
            <Users/>
        </Route>
        <Route path='/create_group' exact>
        <Main/>
        </Route>
        <Route path='/create_chanel' exact>
        <Main/>
        </Route>
        <Redirect to='/chat/:groupId?/:chanelId?'/>
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