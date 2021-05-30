
import { io } from "socket.io-client";
import { socket } from '../../App';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SetRightsForm, setSimpleRoles } from '../../redux/groupsReduser'
import { connect } from 'react-redux';
import SingleRightSettings from "./SingleRightSettings";
import RightsMenu from "./RightsMenu";
function RightsSetingForm(props) {

    let chanel;

    if (props.rightsSetingForm === 'existing_chanel') {
        debugger
        chanel = props.selectedChanel
    }
    let [ICS, setICS] = useState(chanel.invitedCanSee)
    useEffect(async () => {
        let res = await axios.get('http://localhost:8001/roles_simple/' + props.selectedGroup._id)
        debugger
        props.setSimpleRoles(res.data)
    }, [])
    let toggleMenu = (e) => {
        debugger
        e.target.nextElementSibling.classList.toggle('open_menu')
    }
    // let arr = chanel.canSee.list;
    let sendList = (rightId, name, whitelisted) => {
        if (!chanel.canSee.prevelegion) {
            debugger
            axios.put('http://localhost:8001/right/update/' + rightId, {
                list: name, prevelegion: true, whitelisted
            })
        } else {
            axios.put('http://localhost:8001/right/update/' + rightId, {
                list: name, same: whitelisted == chanel.canSee.whitelisted
            })
        }
    }
    let invitedCanSee = (can) => {
        axios.put('http://localhost:8001/invited_can_see/' + chanel._id, { invitedCanSee: can })
        setICS(can)
    }
    return <div style={{ height: '100vh' }}>
        <span onClick={() => { props.SetRightsForm(false) }}>Закрыть</span>
        <h3>Права достуа</h3>
        <div>
            {!ICS
                ? <div onClick={() => { invitedCanSee(true) }}>Разрешить просматривать сообщения приглашенным пользователям</div>
                : <div onClick={() => { invitedCanSee(false) }}>Запретить просматривать сообщения приглашенным пользователям</div>
            }
        </div>
        {!props.SimpleRoles ? null : <ul className='role_list'>
            {props.SimpleRoles.map(item =>
                <li className='role_item'>
                    <div className='role_item_name'
                        onClick={(e) => {
                            if (JSON.parse(localStorage.getItem('role')).role === 'owner'
                                || JSON.parse(localStorage.getItem('role')).role === 'admin') toggleMenu(e)
                        }}
                    >
                        {item.user_name}
                    </div>
                    <div className='react-contextmenu'>
                    <RightsMenu
                        rightId={chanel.canSee._id}
                        user_name={item.user_name}
                        rightTitle='Право на посещение'
                        chanel={chanel}
                        right={chanel.canSee}
                        group={props.selectedGroup}
                    />
                        {/* <div className='react-contextmenu-item'
                            onClick={(e) => { toggleMenu(e) }}>
                            Право на посещение
                                </div>
                        {!chanel.canSee.prevelegion ? <div className='react-contextmenu'>
                            <div className='react-contextmenu-item'
                                onClick={() => { sendList(chanel.canSee._id, item.user_name, true) }}>
                                Создать белый список
                                </div>

                            <div className='react-contextmenu-item'
                                onClick={() => { sendList(chanel.canSee._id, item.user_name, false) }}>
                                Создать черный список
                                </div>
                        </div>
                            : chanel.canSee.whitelisted
                                ? <div className='react-contextmenu'>
                                    <div className='react-contextmenu-item'
                                        onClick={() => { sendList(chanel.canSee._id, item.user_name, true) }}>
                                        Добавить в белый список
                            </div>

                                    <div className='react-contextmenu-item'
                                        onClick={() => { sendList(chanel.canSee._id, item.user_name, false) }}>
                                        Создать черный список
                            </div>
                                </div>
                                : <div className='react-contextmenu'>
                                    <div className='react-contextmenu-item'
                                        onClick={() => { sendList(chanel.canSee._id, item.user_name, true) }}>
                                        Создать белый список
                        </div>

                                    <div className='react-contextmenu-item'
                                        onClick={() => { sendList(chanel.canSee._id, item.user_name, false) }}>
                                        Добавить в черный список
                        </div>
                                </div>

                        } */}

                        <div className='react-contextmenu-item'
                            onClick={() => { }}>
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
                </li>
            )}
        </ul>}
        {/* <ul>
            <SingleRightSettings
                title='Участники, которым разрешено посещать канал'
                right={chanel.canSee}
                group={props.selectedGroup}
                setSimpleRoles={props.setSimpleRoles}
                SimpleRoles={props.SimpleRoles}
            />
            <SingleRightSettings
                title='Участники, которым отпровлять сообщения'
                right={chanel.canWrite}
                group={props.selectedGroup}
                setSimpleRoles={props.setSimpleRoles}
                SimpleRoles={props.SimpleRoles}
            />
            <SingleRightSettings
                title='Участники, которым разрешено смотреть историю'
                right={chanel.canSeeHistory}
                group={props.selectedGroup}
                setSimpleRoles={props.setSimpleRoles}
                SimpleRoles={props.SimpleRoles}
            />
            <SingleRightSettings
                title='Участники, которым разрешено отправлять файлы'
                right={chanel.canSendFile}
                group={props.selectedGroup}
                setSimpleRoles={props.setSimpleRoles}
                SimpleRoles={props.SimpleRoles}
            />
        </ul> */}
    </div>
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        rightsSetingForm: state.groups.rightsSetingForm,
        selectedGroup: state.groups.selectedGroup,
        selectedChanel: state.groups.selectedChanel,
        SimpleRoles: state.groups.SimpleRoles
    }
}
export default connect(mapStateToProps, { SetRightsForm, setSimpleRoles })(RightsSetingForm);