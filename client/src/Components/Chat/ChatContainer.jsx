import Chat from './Chat';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { setMessages } from '../../redux/messagesReduser'
import { setSelectedGroup, setSelected, setOnlineGroupUsers, setSelectedChanel } from '../../redux/groupsReduser'
import { withRouter } from 'react-router';
import { socket } from '../../App';
function ChatContainer(props) {
    let Acces = (right) => {
        let inList;
        inList = right.list.some(item => item == props.name) || props.selectedGroup.author.name==props.name
        debugger
        if ((!right.whitelisted && inList) || (right.whitelisted && !inList)) return false
        return true
    }
    let [accesed, setAccesed] = useState(false);
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
            debugger
            if (accesed) {

                ChatReq.data.canSee.whitelisted
                    ? socket.emit('selectChat', { users: ChatReq.data.rights.users.whitelist, type: 'whitelist' })
                    : socket.emit('selectChat', { users: ChatReq.data.rights.users.blacklist, type: 'blacklist', group: props.selectedGroup })

                socket.on("users", (users) => {
                    users.forEach((user) => {
                        user.self = user.userID === socket.id;
                        console.log(user);
                    });
                    props.setOnlineGroupUsers(users)
                    console.log(props.onlineGroupUsers)
                    console.log('Пользователи получены')

                });
                socket.on("user connected", (user) => {
                    console.log(user, 'conected');
                    props.setOnlineGroupUsers([user])
                    console.log(props.onlineGroupUsers)
                });
                let MesReq = await axios.get('http://localhost:8001/messages/' + chanelId);
                props.setMessages(MesReq.data)
            }
        }
    }, [props.match.params.chanelId])

    if (!props.selectedChanel) {
        return (
            <div className='im_history_not_selected vertical-aligned' style={{ paddingTop: '229px', paddingBottom: '229px' }}>
                Выберите чат для общения
            </div>
        )
    }
    debugger
    if (props.selectedChanel && !accesed) return (
        <div className='im_history_not_selected vertical-aligned' style={{ paddingTop: '229px', paddingBottom: '229px' }}>
            Вы не можете посещать данный канал
        </div>
    )
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
export default connect(mapStateToProps, { setMessages, setSelectedGroup, setSelected, setOnlineGroupUsers, setSelectedChanel })(withRouter(ChatContainer));