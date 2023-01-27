import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import AddUsersForm from './AddUsersForm';
import './Chats.css';
import CreateChanel from './CreateChanel';
import Search from './Search';
import SingleChat from './SingleChat';
import { chatAPI, rolesAPI } from '../../DAL/api';

function Chats(props) {
    let [group, setGroup] = useState(props.selectedGroup)
    useEffect(async () => {
        if (props.selectedGroup) {
            let req = await chatAPI.getChanels(props.name, props.selectedGroup.name, props.match.params.groupId);
            props.setChanels(req.data.chanels)
            localStorage.setItem('right_keys', JSON.stringify(req.data[props.selectedGroup.name]))
        }
    }, [props.selectedGroup])

    useEffect(async () => {
        let role = await rolesAPI.defineRole(props.name, props.match.params.groupId);
        localStorage.setItem('role', JSON.stringify(role))
    }, [props.match.params.groupId])
    useEffect(async () => {
        let role = await axios.get('http://localhost:8001/role_define/' + props.name + '/' + props.match.params.groupId);
        localStorage.setItem('role', JSON.stringify(role.data))
    }, [props.match.params.groupId])
    let toggleMenu = (e) => {
        e.preventDefault()
        e.target.nextElementSibling.classList.toggle('open_menu')
    }
    return (
        <div className='im_dialogs_col_wrap noselect'>

            {/* <Search /> */}
            <div className='group_logo' onClick={(e)=>{toggleMenu(e)}}>Чаты</div>
            <div className='group-contextmenu'>
                {!props.selectedGroup ? <Preloader /> :
                    !JSON.parse(localStorage.getItem('role')) ? null :
                        JSON.parse(localStorage.getItem('role')).role === 'admin'
                            || JSON.parse(localStorage.getItem('role')).role === 'owner'
                            || JSON.parse(localStorage.getItem('role')).role === 'moderator'
                            ? <NavLink to='/create_chanel'>Создать чат</NavLink>
                            : null}
            </div>
            <div className='im_dialogs_col' style={{ height: '100vh' }}>
                <div className='im_dialogs_wrap nano has-scrollbar active-scrollbar'>

                    <div className='im_dialogs_scrollable_wrap nano-content' style={{ right: '-17px' }}>

                        <div>
                            {/* <div>

                                {!JSON.parse(localStorage.getItem('role')) ? null :
                                    JSON.parse(localStorage.getItem('role')).role === 'admin'
                                    ||JSON.parse(localStorage.getItem('role')).role === 'owner'
                                        ? <div onClick={() => { props.setGroupSettingsForm(true) }}>Настроить должности</div>
                                        : null} */}

                            {/* {!props.selectedGroup ? <Preloader /> :
                                    !JSON.parse(localStorage.getItem('role')) ? null :
                                        JSON.parse(localStorage.getItem('role')).role === 'admin'
                                        ||JSON.parse(localStorage.getItem('role')).role === 'owner'
                                        ||JSON.parse(localStorage.getItem('role')).role === 'moderator'
                                            ? <NavLink to='/create_chanel'>Создать чат</NavLink>
                                            // <CreateChanel selectedGroup={props.selectedGroup}
                                            //     SetRightsForm={props.SetRightsForm}
                                            //     author={props.author}
                                            // //    rightsSetingForm={props.rightsSetingForm}
                                            // />
                                            : null} */}

                            {/*   {!JSON.parse(localStorage.getItem('role')) ? null :
                                    JSON.parse(localStorage.getItem('role')).role === 'admin'
                                    ||JSON.parse(localStorage.getItem('role')).role === 'owner'
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
                            </div> */}
                        </div>
                        <ul className='nav nav-pills nav-stacked'>
                            {!props.chanels ? <Preloader />
                                : props.chanels.map(item =>
                                    <SingleChat
                                        groupId={props.match.params.groupId}
                                        chanel={item}
                                        name={item.name}
                                        SetRightsForm={props.SetRightsForm}
                                        setSelectedChanel={props.setSelectedChanel}
                                        author={props.author}
                                    />)}
                        </ul>

                    </div>
                    <div className='nano-pane' style={{ display: 'block' }}>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chats;