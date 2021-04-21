import Chat from './Chat';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import {setMessages} from '../../redux/messagesReduser'
import {setSelectedGroup,setSelected,setOnlineGroupUsers} from '../../redux/groupsReduser'
import { withRouter } from 'react-router';
import { socket } from '../../App';
function ChatContainer(props) {
    useEffect(async()=>{
        let chatId=props.match.params.chatId;
        if (chatId){
            props.setSelected(true)
            console.log(props.selected)
            let ChatReq = await axios.get('http://localhost:8001/single_group/'+chatId);
            props.setSelectedGroup(ChatReq.data)
            // localStorage.setItem('selectedGroup', JSON.stringify(ChatReq.data))
            socket.emit('selectChat',ChatReq.data)
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
                console.log(user,'conected');
                props.setOnlineGroupUsers([user])
                console.log(props.onlineGroupUsers)
              });
            let MesReq = await axios.get('http://localhost:8001/messages/'+chatId);
            props.setMessages(MesReq.data)
        }
    },[props.match.params.chatId])

    return <Chat {...props} />
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        name: state.auth.name,
        selected:state.groups.selected,
        selectedGroup:state.groups.selectedGroup,
        messages:state.messages.messages,
        onlineGroupUsers:state.groups.onlineGroupUsers
    }
}
export default connect(mapStateToProps, {setMessages,setSelectedGroup,setSelected,setOnlineGroupUsers})(withRouter(ChatContainer));