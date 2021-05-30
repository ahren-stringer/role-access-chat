import { connect } from 'react-redux';
import ChatContainer from '../Chat/ChatContainer';
import RightsSetingForm from './RightsSetingForm';
import Chats from '../Chats/ChatsContainer';
import Groups from '../Chats/Groups';
import Header from '../Header/Header';
import './Main.css';
import { SetRightsForm,toggleAddUsersForm,setGroupSettingsForm,setSimpleRoles } from '../../redux/groupsReduser'
import GroupSetingForm from './GroupSetingForm';
import { withRouter } from 'react-router';
import CreateGroup from '../Chats/CreateGroup';
import CreateChanel from '../Chats/CreateChanel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Preloader from '../Preloader/Preloader';

function Main(props) {
    let [usersList, setUsersList] = useState(null);
    let [partnerArr, setPartner] = useState([]);
    let [roles, setRoles] = useState([]);
    useEffect(async () => {
        let req = await axios.get('http://localhost:8001/friends/' + props.author);
        setUsersList(req.data)
    }, [])
    // useEffect(async () => {
    //     let res=[];
    //     if (props.selectedGroup) res = await axios.get('http://localhost:8001/roles_simple/' + props.selectedGroup._id)
    //     debugger
    //     props.setSimpleRoles(res.data)
    // }, [props.location])
    let addUser = (e, name) => {
        let role = {
            role: JSON.parse(localStorage.getItem('role')).role === 'admin'
            || JSON.parse(localStorage.getItem('role')).role === 'owner'?'partner':'invited',
            user_name: name,
            group_id: props.selectedGroup._id
        }
        if (partnerArr.some(item => item === name)) {
            debugger
            let index = partnerArr.indexOf(name);
            partnerArr.splice(index, 1);
            debugger
            setPartner(partnerArr)
            setRoles(roles.splice(index, 1))
            e.target.style.backgroundColor = ''
        } else {
            debugger
            setPartner([...partnerArr, name])
            setRoles([...roles, role])
            e.target.style.backgroundColor = 'blueviolet'
        }
        console.log(partnerArr)
        console.log(roles)
    }
    let sendUsers = async () => {
        let body;
        if (JSON.parse(localStorage.getItem('role')).role === 'admin'
            || JSON.parse(localStorage.getItem('role')).role === 'owner') {
            body = {
                new_parters: partnerArr,
                roles,
                role: "partner"
            };
        } else {
            body = {
                new_parters: partnerArr,
                roles,
                role: 'invited'
            };
        }
        await axios.put('http://localhost:8001/group_add_user/' + props.selectedGroup._id, body,
            {
                headers: {
                    'Role-Access': 'Access ' + JSON.parse(localStorage.getItem('role')).role_key
                }
            })
            props.toggleAddUsersForm(!props.addUsersForm)
    }
    return <div>
        <div className='Header'>
            <Header />
        </div>
        <div className='im_page_wrap clearfix'>
            {props.rightsSetingForm ? 
            <RightsSetingForm />
            // <GroupSetingForm {...props} />
                : props.groupForm ? <GroupSetingForm {...props} />
                    : <div className='im_page_split clearfix'>
                        <Groups />

                        {props.location.pathname == '/create_group'
                            ? <CreateGroup {...props} />
                            : props.location.pathname == '/create_chanel'
                                ? <CreateChanel {...props} />
                                : <>
                                    <Chats />
                                    <ChatContainer />
                                </>}

                    </div>}
        </div>
        <div className='popups'>

            <div className={"add_users_form" + " " + (props.addUsersForm ? 'overlay_target' : '')} >
                <div className="popup">
                    <h2>Пригласить пользователей в группу</h2>
                    <a className="close">&times;</a>
                    <div className="content">
                        {!usersList?<Preloader/>
                        :<ul className='user_list'>
                            {usersList.friends.map(item => {
                                if (item.initiator._id === props.author) {
                                    return <li className='user_item'
                                        onClick={(e) => { addUser(e, item.partner.name) }}>
                                        {item.partner.name}
                                    </li>
                                }
                                if (item.partner._id === props.author) {
                                    return <li className='user_item'
                                        onClick={(e) => { addUser(e, item.initiator.name) }}>
                                        {item.initiator.name}
                                    </li>
                                }
                            }
                            )}
                        </ul>}
                        <button disabled={partnerArr.length === 0 ? true : false}
                            onClick={sendUsers}
                        >ОК</button>
                    </div>
                </div>
            </div>

            {/* <div className={"create_chanel" + " " + (props.createChanelForm ? 'overlay_target' : '')} >
                <div className="popup">
                    <h2>Создатьчат</h2>
                    <a className="close">&times;</a>
                    <div className="content">
                        
                        <button disabled={partnerArr.length === 0 ? true : false}
                            onClick={sendUsers}
                        >ОК</button>
                    </div>
                </div>
            </div> */}
            
        </div>
    </div>
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        rightsSetingForm: state.groups.rightsSetingForm,
        selectedGroup: state.groups.selectedGroup,
        selectedChanel: state.groups.selectedChanel,
        groupForm: state.groups.groupForm,
        addUsersForm: state.groups.addUsersForm,
        SimpleRoles: state.groups.SimpleRoles
    }
}
export default connect(mapStateToProps, { SetRightsForm,toggleAddUsersForm,setGroupSettingsForm,setSimpleRoles })(withRouter(Main));