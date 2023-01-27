import axios from 'axios';
import { useEffect, useState } from 'react';

function SingleRightPopup(props) {
    debugger
    // let [list, setList] = useState([])
    let arr = props.right.list;
    let [simpleRoles, setSimpleRoles] = useState(null)

    let popup = (e) => {
        if (e.target.className == 'button') e.target.parentNode.nextElementSibling.classList.add('overlay_target')
        if (e.target.classList[0] == 'overlay' || e.target.className == 'close') e.target.closest('.overlay').classList.toggle('overlay_target')
    }
    let createList = (e, name) => {
        if (arr.some(item => item === name)) {
            arr.splice(arr.indexOf(name), 1)
            // setList(list.splice(list.indexOf(name),1))
            e.target.style.backgroundColor = ''
            // e.target.classList.toggle('.chosen_item')
        } else {
            arr.push(name)
            // setList([...list,name])
            // e.target.classList.toggle('.chosen_item')
            e.target.style.backgroundColor = 'blueviolet'
        }
        console.log(arr)
    }
    let sendList = (rightId, whitelisted) => {
        if (!props.right.prevelegion) {
            debugger
            axios.put('http://localhost:8001/right/update/' + rightId, { list: arr, prevelegion: true, whitelisted })
        } else {
            axios.put('http://localhost:8001/right/update/' + rightId, { list: arr })
        }
    }
    return <div>
        <div className='whitelist'>
            <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                <div class="box">
                    <a class="button">{props.WLtitle}</a>
                </div>

                <div class="overlay" >
                    <div class="popup">
                        <h2>{props.WLtitle}</h2>
                        <a class="close">&times;</a>
                        <div class="content">
                            {!props.SimpleRoles
                            ? null
                            :<ul className='user_list'>
                                {props.SimpleRoles
                                .filter(item=>item.user_name)
                                .map(item => {
                                    if (props.right.list.some(list_item => list_item == item)) {
                                        return <li
                                            style={props.right.whitelisted
                                                ? { backgroundColor: 'green' }
                                                : { backgroundColor: 'red' }}
                                            onClick={(e) => { createList(e, item) }}
                                            className='user_item'>
                                            {item}
                                        </li>
                                    } else {
                                        return <li
                                            onClick={(e) => { createList(e, item) }}
                                            className='user_item'>
                                            {item}
                                        </li>
                                    }
                                }
                                )}
                            </ul>}
                            <button onClick={() => {
                                sendList(props.right._id, true)
                            }}>ОК</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className='blacklist'>
            <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                <div class="box">
                    <a class="button">{props.BLtitle}</a>
                </div>

                <div class="overlay" >
                    <div class="popup">
                        <h2>{props.BLtitle}</h2>
                        <a class="close">&times;</a>
                        <div class="content">
                            <ul className='user_list'>
                                {props.group.partners.map(item => {
                                    if (props.right.list.some(list_item => list_item == item)) {
                                        return <li
                                            style={props.right.whitelisted
                                                ? { backgroundColor: 'green' }
                                                : { backgroundColor: 'red' }}
                                            onClick={(e) => { createList(e, item) }}
                                            className='user_item'>
                                            {item}
                                        </li>
                                    } else {
                                        return <li
                                            onClick={(e) => { createList(e, item) }}
                                            className='user_item'>
                                            {item}
                                        </li>
                                    }
                                }
                                )}
                            </ul>
                            <button onClick={() => {
                                sendList(props.right._id, false)
                            }}>ОК</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

}

export default SingleRightPopup