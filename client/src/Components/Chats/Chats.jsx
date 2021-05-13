import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import AddUsersForm from './AddUsersForm';
import './Chats.css';
import CreateChanel from './CreateChanel';
import CreateGroup from './CreateGroup';
import Search from './Search';
import SingleChat from './SingleChat';

function Chats(props) {
    debugger
    let [group,setGroup]=useState(props.selectedGroup)
    useEffect(async()=>{
        // setGroup(props.selectedGroup)
        debugger
        if (props.selectedGroup){
            let req = await axios.get('http://localhost:8001/chanels/' +props.name+'/'+props.selectedGroup.name+'/'+ props.match.params.groupId);
            props.setChanels(req.data.chanels)
            localStorage.setItem('right_keys',JSON.stringify(req.data[props.selectedGroup.name]))
        }
    },[props.selectedGroup])
    useEffect(async () => {
        let role = await axios.get('http://localhost:8001/role_define/' + props.name + '/' + props.match.params.groupId);
        // props.defineRole(role.data.role)
        localStorage.setItem('role', JSON.stringify(role.data))
        debugger
        // let req = await axios.get('http://localhost:8001/chanels/' +props.name+'/'+group.name+'/'+ props.match.params.groupId);
        // props.setChanels(req.data.chanels)
    }, [props.match.params.groupId])
    // let [groups,setGroups]=useState(null);
    return (
        <div className='im_dialogs_col_wrap noselect'>

            <Search />

            <div className='im_dialogs_col' style={{ height: '100vh' }}>
                <div className='im_dialogs_wrap nano has-scrollbar active-scrollbar'>

                    <div className='im_dialogs_scrollable_wrap nano-content' style={{ right: '-17px' }}>

                        <div>
                            <NavLink to='/users'>Написать</NavLink>
                            <div>
                                {/* <span>
                            Диалоги
                        </span> */}
                                <span>
                                    Группы
                        </span>
                                {!JSON.parse(localStorage.getItem('role')) ? null :
                                    JSON.parse(localStorage.getItem('role')).role === 'admin'
                                    ||JSON.parse(localStorage.getItem('role')).role === 'owner'
                                        ? <div onClick={() => { props.setGroupSettingsForm(true) }}>Настроить должности</div>
                                        : null}

                                <CreateGroup author={props.author} name={props.name} />

                                {!props.selectedGroup ? <Preloader /> :
                                    !JSON.parse(localStorage.getItem('role')) ? null :
                                        JSON.parse(localStorage.getItem('role')).role === 'admin'
                                        ||JSON.parse(localStorage.getItem('role')).role === 'owner'
                                            ? <CreateChanel selectedGroup={props.selectedGroup}
                                                SetRightsForm={props.SetRightsForm}
                                                author={props.author}
                                            //    rightsSetingForm={props.rightsSetingForm}
                                            />
                                            : null}

                                {!JSON.parse(localStorage.getItem('role')) ? null :
                                    JSON.parse(localStorage.getItem('role')).role === 'admin'
                                    ||JSON.parse(localStorage.getItem('role')).role === 'owner'
                                        ? <AddUsersForm
                                            title='Пригласить пользователей'
                                            selectedGroup={props.selectedGroup}
                                            role={"admin"}
                                            chanels={props.chanels} />
                                        : JSON.parse(localStorage.getItem('role')).role === 'moderator'
                                            ? <AddUsersForm
                                                title='Пригласить визитеров'
                                                selectedGroup={props.selectedGroup}
                                                role={"moderator"}
                                                chanels={props.chanels} />
                                            : null}
                            </div>
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