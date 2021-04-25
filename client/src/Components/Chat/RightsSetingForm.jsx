import './Chat.css';
import { io } from "socket.io-client";
import { socket } from '../../App';
import Preloader from '../Preloader/Preloader';
import { useState } from 'react';
import axios from 'axios';

function RightsSetingForm(props) {
    
    return <div style={{height:'100vh'}}>
        <span onClick={()=>{props.SetRightsForm(false)}}>Закрыть</span>
        
    </div>
}

export default RightsSetingForm;