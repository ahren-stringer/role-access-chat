import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Chats.css';
import CreateGroup from './CreateGroup';
import Search from './Search';
import SingleChat from './SingleChat';

function CreateChanel(props) {

    let [createForm,setCreateForm]=useState(false)

    let createChanel = async () => {
        if (createForm) { setCreateForm(false) }
        else {
            setCreateForm(true)
        }
    }

    return (
        <div>
            <div onClick={createChanel}>Создать Канал</div>
            <div>Настроить права доступа</div>
        </div>
    )
}

export default CreateChanel;