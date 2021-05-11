import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Chats.css';
import CreateGroup from './CreateGroup';
import Search from './Search';
import SingleChat from './SingleChat';
import {setGroups,SetRightsForm,setSelectedGroup,defineRole} from '../../redux/groupsReduser'


function Groups(props) {
    debugger
    useEffect(async()=>{
        let req = await axios.get('http://localhost:8001/groups/'+props.name);
        props.setGroups(req.data)
    },[])
    // let [groups,setGroups]=useState(null);
    return (
    <div className='im_groups_col_wrap noselect'>
        <div>Группы</div>
        <ul className='nav nav-pills nav-stacked'>
                        {!props.groups ? <Preloader/>
                        :props.groups.map(item=><NavLink to={"/chat/"+item._id} activeClassName='active_chat'>
                            <li onClick={()=>{
                                props.setSelectedGroup(item)
                                props.defineRole(item,props.name)}}>
                                {item.name}
                                </li>
                                </NavLink>)}
                    </ul>
    </div>
    )
}

let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        name: state.auth.name,
        groups: state.groups.groups,
        rights:state.groups.rights,
        selectedGroup: state.groups.selectedGroup,
        // rightsSetingForm: state.groups.rightsSetingForm
    }
}
export default connect(mapStateToProps, {setGroups,SetRightsForm,setSelectedGroup,defineRole})(Groups);