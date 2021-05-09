import { io } from "socket.io-client";
import { socket } from '../../App';
import Preloader from '../Preloader/Preloader';
import { useState } from 'react';
import axios from 'axios';

function SingleRightSettings(props) {
    let [displayNone, setDisplayNone] = useState(true)
    let popup=(e)=>{
        debugger
        if (e.target.classList[0]=='overlay' || e.target.className=='close' || e.target.className=='button') document.querySelector('.overlay').classList.toggle('overlay_target')
    }
    return <li>
        <div className='whitelist'>
            <div>Участники, которым разрешено посещать канал</div>
            <div className='popup_wrapper' onClick={(e)=>{popup(e)}}>
            <div class="box">
                <a class="button">Назначить пользователей, которым можно посещать канал</a>
            </div>

            <div class="overlay" >
                <div class="popup">
                    <h2>Here i am</h2>
                    <a class="close">&times;</a>
                    <div class="content">
                        
		            </div>
                </div>
            </div>
            </div>
        </div>
    </li>
}

export default SingleRightSettings;