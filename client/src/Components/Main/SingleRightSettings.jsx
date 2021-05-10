import { io } from "socket.io-client";
import { socket } from '../../App';
import Preloader from '../Preloader/Preloader';
import { useState } from 'react';
import axios from 'axios';

function SingleRightSettings(props) {
    let [list, setList] = useState([])
    let popup = (e) => {
        debugger
        if (e.target.className == 'button') e.target.parentNode.nextElementSibling.classList.add('overlay_target')
        if (e.target.classList[0] == 'overlay' || e.target.className == 'close') e.target.closest('.overlay').classList.toggle('overlay_target')
    }
    let createList=(name)=>{
        if(list.some(item=>item===name)){
            setList(list.splice(list.indexOf(name),1))
        }else{
            setList([...list,name])
        }
    }
    let sendList=(rightId,whitelisted)=>{
        if(!props.right.prevelegion){
            axios.put('http://localhost:8001/right/update/'+rightId,{list,prevelegion:true,whitelisted})
        }else{
            axios.put('http://localhost:8001/right/update/'+rightId,{list})
        }
    }
    return <li className='right_item'>
        <div>{props.title}</div>
        {!props.right.prevelegion
            ? <div>
                <div className='whitelist'>
                    <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                        <div class="box">
                            <a class="button">Назначить пользователей</a>
                        </div>

                        <div class="overlay" >
                            <div class="popup">
                                <h2>Назначить пользователей</h2>
                                <a class="close">&times;</a>
                                <div class="content">
                                    <ul>
                                        {props.group.partners.map(item =>
                                            <li onClick={()=>{createList(item.name,true)}}>
                                                {item.name}
                                            </li>)}
                                    </ul>
                                    <button onClick={()=>{sendList(props.right.id)}}>ОК</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='blacklist'>
                    <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                        <div class="box">
                            <a class="button">Запретить пользователей</a>
                        </div>

                        <div class="overlay" >
                            <div class="popup">
                                <h2>Запретить пользователей</h2>
                                <a class="close">&times;</a>
                                <div class="content">
                                    <ul>
                                        {props.group.partners.map(item => <li>{item.name}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            : props.right.whitelisted
                ? <div>
                    <div className='whitelist'>
                        <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                            <div class="box">
                                <a class="button">Именить белый список</a>
                            </div>

                            <div class="overlay" >
                                <div class="popup">
                                    <h2>Белый список</h2>
                                    <a class="close">&times;</a>
                                    <div class="content">
                                        <ul>
                                            {props.group.partners.map(item => <li>{item.name}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='blacklist'>
                        <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                            <div class="box">
                                <a class="button">Назначить черный список</a>
                            </div>

                            <div class="overlay" >
                                <div class="popup">
                                    <h2>Черный список</h2>
                                    <a class="close">&times;</a>
                                    <div class="content">
                                        <ul>
                                            {props.group.partners.map(item => <li>{item.name}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <div>
                    <div className='whitelist'>
                        <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                            <div class="box">
                                <a class="button">Изменить черный список</a>
                            </div>

                            <div class="overlay" >
                                <div class="popup">
                                    <h2>Черный список</h2>
                                    <a class="close">&times;</a>
                                    <div class="content">
                                        <ul>
                                            {props.group.partners.map(item => <li>{item.name}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='blacklist'>
                        <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                            <div class="box">
                                <a class="button">Назначить белый список</a>
                            </div>

                            <div class="overlay" >
                                <div class="popup">
                                    <h2>Белый список</h2>
                                    <a class="close">&times;</a>
                                    <div class="content">
                                        <ul>
                                            {props.group.partners.map(item => <li>{item.name}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}
    </li>
}

export default SingleRightSettings;