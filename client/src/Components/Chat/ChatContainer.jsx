import Chat from './Chat';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import {setMessages} from '../../redux/messagesReduser'
import {setSelectedGroup,setSelected} from '../../redux/groupsReduser'
import { withRouter } from 'react-router';
function ChatContainer(props) {
debugger
    useEffect(async()=>{
        let chatId=props.match.params.chatId;
        debugger
        if (chatId){
            props.setSelected(true)
            let ChatReq = await axios.get('http://localhost:8001/single_group/'+chatId);
            debugger
            props.setSelectedGroup(ChatReq.data)
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
    }
}
export default connect(mapStateToProps, {setMessages,setSelectedGroup,setSelected})(withRouter(ChatContainer));