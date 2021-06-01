
import { io } from "socket.io-client";
import { socket } from '../../App';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SetRightsForm, setSimpleRoles } from '../../redux/groupsReduser'
import { connect } from 'react-redux';
import SingleRightSettings from "./SingleRightSettings";
import { rightsAPI } from "../../DAL/api";
function RightsMenu(props) {

    let toggleMenu = (e) => {
        debugger
        e.target.nextElementSibling.classList.toggle('open_menu')
    }
    // let arr = chanel.canSee.list;
    let sendList = async (rightId, name, whitelisted) => {
        if (!props.right.prevelegion) {
            debugger
            await rightsAPI.addToList(props.group._id,rightId, {
                list: name, prevelegion: true, whitelisted
            })
        } else {
            await rightsAPI.addToList(props.group._id,rightId, {
                list: name, same: whitelisted == props.right.whitelisted
            })
        }
    }
    let removeFromList = async (rightId, name) => {
        await rightsAPI.removeFromList(props.group._id,rightId, {
            user_name: name
        })
    }

    return <div>
        <div className='react-contextmenu-item'
            onClick={(e) => { toggleMenu(e) }}
            style={!props.right.prevelegion ? {}
                : props.right.whitelisted && props.right.list.some(item => item == props.user_name) ? { backgroundColor: 'green' }
                    : props.right.blacklisted && props.right.list.some(item => item == props.user_name) ? { backgroundColor: 'red' }
                        : {}}>
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
                        {!props.right.list.some(item => item == props.user_name)
                            ? <div className='react-contextmenu-item'
                                onClick={() => { sendList(props.rightId, props.user_name, true) }}
                            >
                                Добавить в белый список
                            </div>
                            : <div className='react-contextmenu-item'
                                onClick={() => { removeFromList(props.rightId, props.user_name) }}
                            >
                                Удалить из белого списка
                            </div>}

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

                        {!props.right.list.some(item => item == props.user_name)
                            ? <div className='react-contextmenu-item'
                                onClick={() => { sendList(props.rightId, props.user_name, true) }}
                            >
                                Добавить в черный список
                            </div>
                            : <div className='react-contextmenu-item'
                                onClick={() => { removeFromList(props.rightId, props.user_name) }}
                            >
                                Удалить из черного списка
                            </div>}
                    </div>

        }
    </div>
}

export default RightsMenu;