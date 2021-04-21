import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Chats.css';
import CreateGroup from './CreateGroup';
import Search from './Search';
import SingleChat from './SingleChat';

function Groups(props) {

    // let [groups,setGroups]=useState(null);
    return (
    <div className='im_groups_col_wrap noselect'>
        <div>Группы</div>
        
    </div>
    )
}

export default Groups;