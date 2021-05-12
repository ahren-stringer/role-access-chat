import { SetRightsForm } from '../../redux/groupsReduser'
import { connect } from 'react-redux';
import SingleRightSettings from "./SingleRightSettings";
import SingleGroupSettings from './SingleGroupSettings';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

function GroupSetingForm(props) {
    let [roled, setRoled] = useState(null)

    useEffect(async () => {
        let res = await axios.get('http://localhost:8001/roles_all/' + props.selectedGroup._id)
        setRoled(res.data)
    }, [])

    // let toggleMenu=(e)=>{
    //     debugger
    //     e.target.nextElementSibling.classList.toggle('.open_menu')
    // }

    let changeRole = async (name, role) => {
        debugger
        await axios.put('http://localhost:8001/roles_update/' + name + '/' + props.selectedGroup._id, { role })
        let res = await axios.get('http://localhost:8001/roles_all/' + props.selectedGroup._id)
        setRoled(res.data)
    }
    return <div style={{ height: '100vh' }}>
        <span onClick={() => { props.SetRightsForm(false) }}>Закрыть</span>
        <h3>Роли</h3>
        {!roled ? <Preloader /> : <div>
            <h4>Администраторы</h4>
            <ul className='role_list'>
                {roled
                    .filter(item => item.role === 'admin')
                    .map(item => <li className='role_item'>
                        <ContextMenuTrigger holdToDisplay={1} id="same_unique_identifier">
                            {item.user_name}
                        </ContextMenuTrigger>

                        <ContextMenu id="same_unique_identifier">
                            <MenuItem data={{ foo: 'bar' }} onClick={() => { console.log(';;;;;;;;') }}>
                                Назначить модератором
                        </MenuItem>
                            <MenuItem data={{ foo: 'bar' }} >
                                Назначить обычным пользователем
                        </MenuItem>
                            <MenuItem divider />
                            <MenuItem data={{ foo: 'bar' }} >
                                Удалить из Группы
                        </MenuItem>
                        </ContextMenu>
                    </li>
                    )}
            </ul>
            <h4>Модераторы</h4>
            <ul className='role_list'>
                {roled
                    .filter(item => item.role === 'moderator')
                    .map(item => <li className='role_item'>
                        <ContextMenuTrigger holdToDisplay={1} id="same_unique_identifier">
                            {item.user_name}
                        </ContextMenuTrigger>

                        <ContextMenu id="same_unique_identifier">
                            <MenuItem data={{ foo: 'bar' }} onClick={() => { console.log(';;;;;;;;') }}>
                                Назначить модератором
                        </MenuItem>
                            <MenuItem data={{ foo: 'bar' }} >
                                Назначить обычным пользователем
                        </MenuItem>
                            <MenuItem divider />
                            <MenuItem data={{ foo: 'bar' }} >
                                Удалить из Группы
                        </MenuItem>
                        </ContextMenu>
                    </li>
                    )}
            </ul>
            <h4>Пользователи</h4>
            <ul className='role_list'>
                {roled
                    .filter(item => item.role !== 'admin' && item.role !== 'moderator' && item.role !== 'invited')
                    .map(item => <li>
                        <div className='role_item' 
                        // onClick={(e)=>{toggleMenu(e)}}
                        >
                            {item.user_name}
                        </div>


                        <div className='react-contextmenu'>
                            <div className='react-contextmenu-item'
                            onClick={() => {
                                debugger
                                changeRole(item.user_name, 'moderator')
                            }}>
                                Назначить модератором
                                </div>

                            <div className='react-contextmenu-item'>
                                Назначить обычным пользователем
                                </div>
                            <div className='react-contextmenu-item'>
                                Удалить из Группы
                                </div>
                        </div>


                    </li>
                    )}
            </ul>
            <h4>Лист ожидания</h4>
            <ul className='role_list'>
                {roled
                    .filter(item => item.role === 'invited')
                    .map(item => <li className='role_item'>
                        <ContextMenuTrigger holdToDisplay={1} id="same_unique_identifier">
                            {item.user_name}
                        </ContextMenuTrigger>

                        <ContextMenu id="same_unique_identifier">
                            <MenuItem data={{ foo: 'bar' }} onClick={() => { console.log(';;;;;;;;') }}>
                                Назначить модератором
                        </MenuItem>
                            <MenuItem data={{ foo: 'bar' }} >
                                Назначить обычным пользователем
                        </MenuItem>
                            <MenuItem divider />
                            <MenuItem data={{ foo: 'bar' }} >
                                Удалить из Группы
                        </MenuItem>
                        </ContextMenu>
                    </li>
                    )}
            </ul>
        </div>
        }
        {/* <SingleGroupSettings
                title='Назначить администраоров'
                role='admin'
                userId={props.author}
                name={props.name}
                group={props.selectedGroup}
                />
                <SingleGroupSettings
                title='Назначить модераторов'
                role='moderator'
                group={props.selectedGroup}
                userId={props.author}
                name={props.name}
                />
                <SingleGroupSettings
                title='Назначить простым пользователем'
                role='partner'
                userId={props.author}
                group={props.selectedGroup}
                name={props.name}
                /> */}

    </div>
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        name: state.auth.name,
        rightsSetingForm: state.groups.rightsSetingForm,
        selectedGroup: state.groups.selectedGroup,
        selectedChanel: state.groups.selectedChanel,
    }
}
export default connect(mapStateToProps, { SetRightsForm })(GroupSetingForm);