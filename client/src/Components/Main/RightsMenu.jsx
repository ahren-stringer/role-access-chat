
import { io } from "socket.io-client";
import { socket } from '../../App';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SetRightsForm, setSimpleRoles } from '../../redux/groupsReduser'
import { connect } from 'react-redux';
import SingleRightSettings from "./SingleRightSettings";
function RightsMenu(props) {

    let toggleMenu = (e) => {
        debugger
        e.target.nextElementSibling.classList.toggle('open_menu')
    }
    // let arr = chanel.canSee.list;
    let sendList = (rightId, name, whitelisted) => {
        if (!props.right.prevelegion) {
            debugger
            axios.put('http://localhost:8001/right/update/' + rightId, {
                list: name, prevelegion: true, whitelisted
            })
        } else {
            axios.put('http://localhost:8001/right/update/' + rightId, {
                list: name, same: whitelisted == props.right.whitelisted
            })
        }
    }
    return <div>
        <div className='react-contextmenu-item'
            onClick={(e) => { toggleMenu(e) }}>
            {props.rightTitle}
                                </div>
        {
            !props.right.prevelegion ? <div className='react-contextmenu'>
                <div className='react-contextmenu-item'
                    onClick={() => { sendList(props.rightId, props.user_name, true) }}>
                    Создать белый список
                                </div>

                <div className='react-contextmenu-item'
                    onClick={() => { sendList(props.rightId, props.user_name, false) }}>
                    Создать черный список
                                </div>
            </div>
                : props.right.whitelisted
                    ? <div className='react-contextmenu'>
                        <div className='react-contextmenu-item'
                            onClick={() => { sendList(props.rightId, props.user_name, true) }}>
                            Добавить в белый список
                            </div>

                        <div className='react-contextmenu-item'
                            onClick={() => { sendList(props.rightId, props.user_name, false) }}>
                            Создать черный список
                            </div>
                    </div>
                    : <div className='react-contextmenu'>
                        <div className='react-contextmenu-item'
                            onClick={() => { sendList(props.rightId, props.user_name, true) }}>
                            Создать белый список
                        </div>

                        <div className='react-contextmenu-item'
                            onClick={() => { sendList(props.rightId, props.user_name, false) }}>
                            Добавить в черный список
                        </div>
                    </div>

        }
    </div>
}

export default RightsMenu;