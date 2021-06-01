import s from './Header.module.css';
import { logout } from '../../redux/authReduser'
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import {setHistoryPopup,setHistory} from '../../redux/groupsReduser'
import axios from 'axios';

function Header(props) {
    let [menu, setMenu] = useState(false)
    let seeHistory=async()=>{
        let res= await axios('http://localhost:8001/history/'+props.selectedChanel._id)
        props.setHistory(res.data)
        props.setHistoryPopup(true)
    }
    return <div className='clearfix'>
        <header className={s.header}>
            <div className={s.header__logo} onClick={() => { setMenu(!menu) }}>
                <div className={s.user_name}>
                    {props.name}
                </div>
                <ul className={s.menu} style={menu ? { display: 'block' } : null}>
                    <li>
                        <NavLink to='/users'>Контакты</NavLink>
                    </li>
                    <li>
                        <NavLink to='/create_group'>Создать группу</NavLink>
                    </li>
                    <li>
                        <span onClick={() => { props.logout() }}>Выйти</span>
                    </li>
                </ul>
            </div>
            {/* <div className='for_chanel_name'>
                {!props.selectedChanel ? null
                    : <div>
                        <div>
                            {props.selectedChanel.name}
                        </div>
                        <div onClick={seeHistory}>
                            История
                        </div>
                    </div>
                }
            </div> */}
        </header>
    </div>
}

let mapStateToProps = (state) => {
    return {
        name: state.auth.name,
        selectedChanel: state.groups.selectedChanel,
    }
}

export default connect(mapStateToProps, { logout,setHistoryPopup,setHistory })(Header);