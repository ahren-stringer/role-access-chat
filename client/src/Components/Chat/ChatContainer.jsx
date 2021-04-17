import Chat from './Chat';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';

function ChatContainer(props) {

    // let groups=null;

    // useEffect(async()=>{
    //     let req = await axios.get('http://localhost:8001/groups/'+props.author);
    //     groups=req.data
    // },[])

    return <Chat {...props} />
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        name: state.auth.name,
    }
}
export default connect(mapStateToProps, {})(ChatContainer);