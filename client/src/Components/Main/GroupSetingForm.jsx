import { SetRightsForm } from '../../redux/groupsReduser'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { groupAPI, rolesAPI } from '../../DAL/api';

function GroupSetingForm(props) {
    let [roled, setRoled] = useState(null)
    let [roledSimple, setRoledSimple] = useState(null)
    let [rename, setRename] = useState(false)
    let [groupName, setGroupName] = useState(props.selectedGroup.name);

    let chanel;
    if (props.rightsSetingForm === 'existing_chanel') {
        debugger
        chanel = props.selectedChanel
    }
    useEffect(async () => {
        let res
        if (props.groupForm) {
            res = await rolesAPI.getAllRoles(props.selectedGroup._id)
            setRoled(res)
        }
        if (props.rightsSetingForm) {
            res = rolesAPI.getSimpleRoles(props.selectedGroup._id)
            setRoledSimple(res)
        }
    }, [])

    let toggleMenu = (e) => {
        debugger
        e.target.nextElementSibling.classList.toggle('open_menu')
    }

    let changeRole = async (name, role) => {
        debugger
        await rolesAPI.changeRole(name,props.selectedGroup._id, { role })
        let res = await rolesAPI.getAllRoles(props.selectedGroup._id)
        setRoled(res)
    }
    let deleteUser = async (name) => {
        if (JSON.parse(localStorage.getItem('role')).role === 'admin'
            || JSON.parse(localStorage.getItem('role')).role === 'owner') {
            await groupAPI.deleteUser(name,props.selectedGroup._id)
            let res = await axios.get('http://localhost:8001/roles_all/' + props.selectedGroup._id)
            setRoled(res)
        }
    }
    let renameGroup = async (newName) => {
        await groupAPI.renameGroup(props.selectedGroup._id, { name: newName })
        setRename(!rename)
    }

    return <div style={{ height: '100vh' }}>
        <span onClick={() => { props.setGroupSettingsForm(false) }}>Закрыть</span>
        <div>
            <span>Группа под названием:</span>
        {
            (!rename)
                ? <span>
                    <span onDoubleClick={() => { setRename(!rename) }}>{props.selectedGroup.name}</span>
                </span>
                : <span>
                    <input autoFocus={true} onBlur={() => {
                        renameGroup(groupName)
                    }}
                        onChange={(e) => { setGroupName(e.target.value) }}
                        value={groupName} />
                </span>
        }
        </div>
        {!roled ? null : <div>
            <h3>Роли</h3>
            <div>
                <h4>Владелец</h4>
                <ul className='role_list'>
                    {roled
                        .filter(item => item.role === 'owner')
                        .map(item => <li className='role_item'>
                            <div className='role_item_name'>
                                {item.user_name}
                            </div>
                        </li>
                        )}
                </ul>
                <h4>Администраторы</h4>
                <ul className='role_list'>
                    {roled
                        .filter(item => item.role === 'admin')
                        .map(item => <li className='role_item'>
                            <div className='role_item_name'
                                onClick={(e) => {
                                    if (JSON.parse(localStorage.getItem('role')).role === 'owner') toggleMenu(e)
                                }}
                            >
                                {item.user_name}
                            </div>

                            <div className='react-contextmenu'>

                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'moderator') }}>
                                    Назначить модератором
                                </div>
                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'partner') }}>
                                    Назначить обычным пользователем
                                </div>
                                <div className='react-contextmenu-item'
                                    onClick={() => { deleteUser(item.user_name) }}>
                                    Удалить из Группы
                                </div>
                            </div>
                        </li>
                        )}
                </ul>
                <h4>Модераторы</h4>
                <ul className='role_list'>
                    {roled
                        .filter(item => item.role === 'moderator')
                        .map(item => <li className='role_item'>
                            <div className='role_item_name'
                                onClick={(e) => {
                                    if (JSON.parse(localStorage.getItem('role')).role === 'owner'
                                        || JSON.parse(localStorage.getItem('role')).role === 'admin') toggleMenu(e)
                                }}
                            >
                                {item.user_name}
                            </div>

                            <div className='react-contextmenu'>
                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'admin') }}>
                                    Назначить администратором
                                </div>

                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'partner') }}>
                                    Назначить обычным пользователем
                                </div>
                                <div className='react-contextmenu-item'
                                    onClick={() => { deleteUser(item.user_name) }}>
                                    Удалить из Группы
                                </div>
                            </div>
                        </li>
                        )}
                </ul>
                <h4>Пользователи</h4>
                <ul className='role_list'>
                    {roled
                        .filter(item => item.role === 'partner')
                        .map(item => <li className='role_item'>
                            <div className='role_item_name'
                                onClick={(e) => {
                                    if (JSON.parse(localStorage.getItem('role')).role === 'owner'
                                        || JSON.parse(localStorage.getItem('role')).role === 'admin') toggleMenu(e)
                                }}
                            >
                                {item.user_name}
                            </div>

                            <div className='react-contextmenu'>
                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'admin') }}>
                                    Назначить администратором
                                </div>

                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'moderator') }}>
                                    Назначить модератором
                                </div>
                                <div className='react-contextmenu-item'
                                    onClick={() => { deleteUser(item.user_name) }}>
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
                            <div className='role_item_name'
                                onClick={(e) => {
                                    if (JSON.parse(localStorage.getItem('role')).role === 'owner'
                                        || JSON.parse(localStorage.getItem('role')).role === 'admin') toggleMenu(e)
                                }}
                            >
                                {item.user_name}
                            </div>

                            <div className='react-contextmenu'>
                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'admin') }}>
                                    Назначить администратором
                                </div>

                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'moderator') }}>
                                    Назначить модератором
                                </div>
                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'partner') }}>
                                    Назначить обычным пользователем
                                </div>
                                <div className='react-contextmenu-item'
                                    onClick={() => { deleteUser(item.user_name) }}>
                                    Удалить из Группы
                                </div>
                            </div>
                        </li>
                        )}
                </ul>
            </div>
        </div>
        }
        {
            !roledSimple ? null : <div>
                <h3>Права достуа</h3>
                <ul className='role_list'>
                    {roledSimple.map(item => <li className='role_item'>
                        <div className='role_item_name'
                            onClick={(e) => {
                                if (JSON.parse(localStorage.getItem('role')).role === 'owner'
                                    || JSON.parse(localStorage.getItem('role')).role === 'admin') toggleMenu(e)
                            }}
                        >
                            {item.user_name}
                        </div>

                        <div className='react-contextmenu'>
                            <div className='react-contextmenu-item'
                                onClick={(e) => { toggleMenu(e) }}>
                                Право на посещение
                                </div>

                            <div className='react-contextmenu'>
                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'admin') }}>
                                    Создать белый список
                                </div>

                                <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'moderator') }}>
                                    Создать черный список
                                </div>

                            </div>
                            <div className='react-contextmenu-item'
                                onClick={() => { changeRole(item.user_name, 'moderator') }}>
                                Право на отправку
                                </div>
                            {/* <div className='react-contextmenu-item'
                                    onClick={() => { changeRole(item.user_name, 'partner') }}>
                                    Назначить обычным пользователем
                                </div>
                                <div className='react-contextmenu-item'
                                    onClick={() => { deleteUser(item.user_name) }}>
                                    Удалить из Группы
                                </div> */}
                        </div>
                    </li>)}
                </ul>
            </div>
        }

    </div >
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