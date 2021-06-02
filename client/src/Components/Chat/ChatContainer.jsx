import Chat from './Chat';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setMessages,pushMessage } from '../../redux/messagesReduser'
import { setSelectedGroup, setSelected, setOnlineGroupUsers, setSelectedChanel } from '../../redux/groupsReduser'
import { withRouter } from 'react-router';
import { socket } from '../../App';
import { messagesAPI } from '../../DAL/api';
function ChatContainer(props) {

    let Acces = (right) => {
        let inList;
        inList = right.list.some(item => item == props.name)
        debugger
        if (props.selectedGroup.author.name==props.name) return true
        if (right.hightRoleList.some(item => item == props.name)) return true
        if ((right.whitelisted && inList) || (!right.whitelisted && !inList)) return true
        if ((!right.whitelisted && inList) || (right.whitelisted && !inList)) return false
    }
    let [accesed, setAccesed] = useState(null);
    useEffect(async () => {
        let chanelId = props.match.params.chanelId;
        if (chanelId) {
            props.setSelected(true)
            console.log(props.selected)
            let ChatReq = await axios.get('http://localhost:8001/single_chanel/' + chanelId);
            props.setSelectedChanel(ChatReq.data)
            console.log('ChatReq.data', ChatReq.data)
            let a = Acces(ChatReq.data.canSee)
            setAccesed(Acces(ChatReq.data.canSee))
            // setAccesed(JSON.parse(localStorage.getItem('right_keys'))[ChatReq.data.name].canSee)
debugger
            if (JSON.parse(localStorage.getItem('right_keys'))[ChatReq.data.name].canSee) {

                !ChatReq.data.canSee.prevelegion
                    ? socket.emit('selectChat', { users: ChatReq.data.canSee.list})
                    : ChatReq.data.canSee.whitelisted
                        ? socket.emit('selectChat', { users: ChatReq.data.canSee.list})
                        : socket.emit('selectChat', {
                            users: [props.selectedGroup.author.name,...props.selectedGroup.partners.filter(
                                item => !ChatReq.data.canSee.list.some(list_item => list_item === item)
                            )]
                        })

                socket.on("users", (users) => {
                    users.forEach((user) => {
                        user.self = user.userID === socket.id;
                        console.log(user);
                    });
                    props.setOnlineGroupUsers(users)
                    console.log(props.onlineGroupUsers)
                    console.log('Пользователи получены')

                });
                // socket.on("user connected", (user) => {
                //     console.log(user, 'conected');
                //     props.setOnlineGroupUsers([user])
                //     console.log(props.onlineGroupUsers)
                // });
                let MesReq = await messagesAPI.getMessages(chanelId);
                props.setMessages(MesReq)
            }
        }
    }, [props.match.params.chanelId])

    if (!props.selectedChanel) {
        return (
            <div className='im_history_not_selected vertical-aligned' style={{ paddingTop: '229px', paddingBottom: '229px' }}>
                {/* Выберите чат для общения */}
            </div>
        )
    }

    if (props.selectedChanel && !accesed) {
        debugger
        return (
        <div className='im_history_not_selected vertical-aligned' style={{ paddingTop: '229px', paddingBottom: '229px' }}>
            Вы не можете посещать данный канал
        </div>
    )}
    return <Chat {...props} />
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        name: state.auth.name,
        selected: state.groups.selected,
        selectedGroup: state.groups.selectedGroup,
        messages: state.messages.messages,
        onlineGroupUsers: state.groups.onlineGroupUsers,
        selectedChanel: state.groups.selectedChanel,
    }
}
export default connect(mapStateToProps, { setMessages, setSelectedGroup, setSelected, setOnlineGroupUsers, setSelectedChanel,pushMessage })(withRouter(ChatContainer));