import axios from 'axios';
import { useEffect, useState } from 'react';

function SingleGroupSettings(props) {
    let [roled, setRoled] = useState(null)
    let arr = []
    useEffect(async () => {
        let res = await axios.get('http://localhost:8001/roles/' + props.role + '/' + props.group._id)
        setRoled(res.data)
    }, [])
    let popup = (e) => {
        if (e.target.className == 'button') e.target.parentNode.nextElementSibling.classList.add('overlay_target')
        if (e.target.classList[0] == 'overlay' || e.target.className == 'close') e.target.closest('.overlay').classList.toggle('overlay_target')
    }
    let createList = (e, name) => {
        if (arr.some(item => item === name)) {
            arr.splice(arr.indexOf(name), 1)
            e.target.style.backgroundColor = ''
        } else {

            arr.push(name)
            e.target.style.backgroundColor = 'blueviolet'
        }
        console.log(arr)
    }
    let sendList = (groupId) => {
        debugger
        axios.put('http://localhost:8001/group/update/' + props.role + '/' + groupId, { list: arr })
    }
    return <li className='right_item'>
        <div>{props.title}</div>
        <div className=''>
            <div className='popup_wrapper' onClick={(e) => { popup(e) }}>
                <div class="box">
                    <a class="button">Назначить пользователей</a>
                </div>

                <div class="overlay" >
                    <div class="popup">
                        <h2>Назначить пользователей</h2>
                        <a class="close">&times;</a>
                        <div class="content">
                            <ul className='user_list'>
                                
                                {!roled ? null :
                                    roled.map(item =>
                                        <li onClick={(e) => { createList(e, item) }}
                                            className='user_item'>
                                            {item.user_name}
                                        </li>)
                                }
                            </ul>
                            <button onClick={() => {
                                sendList(props.group._id, true)
                            }}>ОК</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </li>
}

export default SingleGroupSettings;