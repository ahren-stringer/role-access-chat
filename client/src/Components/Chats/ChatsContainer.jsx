import Chats from './Chats';
import './Chats.css';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import {setGroups} from '../../redux/groupsReduser'
import Preloader from '../Preloader/Preloader';

function ChatsContainer(props) {
    useEffect(async()=>{
        let req = await axios.get('http://localhost:8001/groups/'+props.author);
        props.setGroups(req.data)
    },[])
    // if (!props.groups) return <Preloader/>
    return <Chats {...props} />
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        name: state.auth.name,
        groups: state.groups.groups,
    }
}
export default connect(mapStateToProps, {setGroups})(ChatsContainer);