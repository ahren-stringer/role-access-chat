import Chats from './Chats';
import './Chats.css';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import axios from 'axios';
import {setGroups,SetRightsForm,setChanels,setSelectedChanel,setGroupSettingsForm,defineRole} from '../../redux/groupsReduser'
import Preloader from '../Preloader/Preloader';
import { withRouter } from 'react-router';

function ChatsContainer(props) {
    if (props.match.params.groupId) {return <Chats {...props} />}
    else {return <div>Выберете группу</div>}

    // if (!props.groups) return <Preloader/>
    return <Chats {...props} />
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        name: state.auth.name,
        groups: state.groups.groups,
        rights:state.groups.rights,
        selectedGroup: state.groups.selectedGroup,
        chanels:state.groups.chanels,
        role: state.groups.role
        // rightsSetingForm: state.groups.rightsSetingForm
    }
}
export default connect(mapStateToProps, {setGroups,SetRightsForm,setChanels,setSelectedChanel,setGroupSettingsForm,defineRole})(withRouter(ChatsContainer));