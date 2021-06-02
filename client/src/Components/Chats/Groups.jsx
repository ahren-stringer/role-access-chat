import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Chats.css';
import { setGroups, SetRightsForm, setSelectedGroup, defineRole,setGroupSettingsForm,toggleAddUsersForm } from '../../redux/groupsReduser'
import { groupAPI } from '../../DAL/api';
import AddUsersForm from './AddUsersForm';


function Groups(props) {
    useEffect(async () => {
        let req = await groupAPI.getGroups(props.name)
        props.setGroups(req)
    }, [])
    let toggleMenu = (e) => {
        debugger
        e.preventDefault()
        e.target.nextElementSibling.classList.toggle('open_menu')
    }
    // document.className('group-contextmenu-item').onClick(e=>e.classList.toggle('open_menu'))
    // let [groups,setGroups]=useState(null);
    return (
        <div className='im_groups_col_wrap noselect'>
            <div className='group_logo'>Группы</div>
            <ul className='nav nav-pills nav-stacked'>
                {!props.groups ? <Preloader />
                    : props.groups.map(item =>
                        <NavLink
                            to={"/chat/" + item._id}
                            className="group_link"
                            activeClassName='active_chat'
                        >
                            <li className="group_item"
                                onClick={() => {
                                    props.setSelectedGroup(item)
                                }}
                                >
                                    <div onContextMenu={(e)=>{toggleMenu(e)}}>
                                        {item.name}
                                        </div>
                                
                                <div className='group-contextmenu'>
                                    <div className='group-contextmenu-item'
                                    onClick={(e)=>{e.target.parentNode.classList.toggle('open_menu')}}>
                                        {!JSON.parse(localStorage.getItem('role')) ? null :
                                            JSON.parse(localStorage.getItem('role')).role === 'admin'
                                                || JSON.parse(localStorage.getItem('role')).role === 'owner'
                                                ? <div onClick={() => { props.setGroupSettingsForm(true) }}>Настроить должности</div>
                                                : null}
                                    </div>

                                    {/* <CreateGroup author={props.author} name={props.name} /> */}
                                    {/* <div className='group-contextmenu-item'
                                    onClick={(e)=>{e.target.parentNode.classList.toggle('open_menu')}}>
                                        {!JSON.parse(localStorage.getItem('role')) ? null :
                                            JSON.parse(localStorage.getItem('role')).role === 'admin'
                                                || JSON.parse(localStorage.getItem('role')).role === 'owner'
                                                || JSON.parse(localStorage.getItem('role')).role === 'moderator'
                                                ? <NavLink to={'/create_chanel/'+item._id}>Создать чат</NavLink>
                                                : null} 
                                    </div>*/}
                                    <div className='group-contextmenu-item'
                                    onClick={(e)=>{e.target.parentNode.classList.toggle('open_menu')}}>
                                        {!JSON.parse(localStorage.getItem('role')) ? null :
                                            JSON.parse(localStorage.getItem('role')).role === 'admin'
                                                || JSON.parse(localStorage.getItem('role')).role === 'owner'
                                                ? <AddUsersForm
                                                    title='Пригласить пользователей'
                                                    selectedGroup={props.selectedGroup}
                                                    role={"admin"}
                                                    chanels={props.chanels}
                                                    addUsersForm={props.addUsersForm}
                                                    toggleAddUsersForm={props.toggleAddUsersForm} />
                                                : JSON.parse(localStorage.getItem('role')).role === 'moderator'
                                                    ? <AddUsersForm
                                                        title='Пригласить визитеров'
                                                        selectedGroup={props.selectedGroup}
                                                        role={"moderator"}
                                                        chanels={props.chanels}
                                                        toggleAddUsersForm={props.toggleAddUsersForm} />
                                                    : null}
                                    </div>
                                </div>
                            </li>
                        </NavLink>)}
            </ul>
        </div>
    )
}

let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        name: state.auth.name,
        groups: state.groups.groups,
        rights: state.groups.rights,
        selectedGroup: state.groups.selectedGroup,
        // rightsSetingForm: state.groups.rightsSetingForm
    }
}
export default connect(mapStateToProps, { setGroups, SetRightsForm, setSelectedGroup, defineRole,setGroupSettingsForm,toggleAddUsersForm })(Groups);