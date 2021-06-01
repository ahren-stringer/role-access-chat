import axios from 'axios';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Chats.css';
import { setGroups, SetRightsForm, setSelectedGroup, defineRole } from '../../redux/groupsReduser'
import { groupAPI } from '../../DAL/api';


function Groups(props) {
    useEffect(async () => {
        let req = await groupAPI.getGroups(props.name)
        props.setGroups(req)
    }, [])
    // let [groups,setGroups]=useState(null);
    return (
        <div className='im_groups_col_wrap noselect'>
            <div className='group_logo'>Группы</div>
            <ul className='nav nav-pills nav-stacked'>
                {!props.groups ? <Preloader />
                    : props.groups.map(item =>
                        <NavLink
                            to={"/chat/" + item._id}
                            className="group_link"
                            activeClassName='active_chat'
                        >
                            <li className="group_item"
                                onClick={() => {
                                    props.setSelectedGroup(item)
                                }}>
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
        rights: state.groups.rights,
        selectedGroup: state.groups.selectedGroup,
        // rightsSetingForm: state.groups.rightsSetingForm
    }
}
export default connect(mapStateToProps, { setGroups, SetRightsForm, setSelectedGroup, defineRole })(Groups);