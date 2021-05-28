import s from './Header.module.css';
import { logout } from '../../redux/authReduser'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function Header(props) {
    let [menu, setMenu]=useState(false)
    return <div className='clearfix'>
        <header className={s.header}>
            <div className={s.header__logo} onClick={()=>{setMenu(!menu)}}>
                <div className={s.user_name}>
                {props.name}
                </div>
                <ul className={s.menu} style={menu?{display:'block'}:null}>
                    <li>
                    <NavLink to='/users'>Контакты</NavLink> 
                    </li>
                    <li>
                    <NavLink to='/create_group'>Создать группу</NavLink>
                    </li>
                </ul>
            </div>
            <div className={s.header__main}>
                <span onClick={()=>{props.logout()}}>Выйти</span>
            </div>
        </header>
    </div>
}

let mapStateToProps = (state) => {
    return {
      name: state.auth.name
    }
  }
  
  export default connect(mapStateToProps, { logout})(Header);