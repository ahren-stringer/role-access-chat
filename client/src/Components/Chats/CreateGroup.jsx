import axios from 'axios';
import { useEffect, useState } from 'react';

function CreateGroup(props) {

    let [usersList, setUsersList] = useState(null);
    let [partnerArr, setPartner] = useState([]);
    let arr = [];
    let [groupName, setGroupName] = useState('');
    let [roles, setRoles] = useState([
        {
            role: 'admin',
            user_name: props.name
        }
    ]);

    let addPartner = (e, partnerId, partnerName) => {
        let role = {
            role: 'partner',
            user_name: partnerName
        }
        debugger
        if (partnerArr.some(item => item === partnerName)) {
            debugger
            let index = arr.indexOf(partnerName);
            setPartner(partnerArr.splice(index, 1))
            setRoles(roles.splice(index, 1))
            e.target.style.backgroundColor = ''
        } else {
            setPartner([...partnerArr, partnerName])
            setRoles([...roles, role])
            e.target.style.backgroundColor = 'blueviolet'
        }
        console.log(partnerArr)
        console.log(roles)
        // setPartner(Array.from(new Set([...partnerArr, partnerName])))
    }
    let createNewGroup = async () => {
        debugger
        await axios.post('http://localhost:8001/groups', {
            name: groupName,
            author: props.author,
            partners: partnerArr,
            roles
        })
    }

    useEffect(async () => {
        let req = await axios.get('http://localhost:8001/friends/' + props.author);
        setUsersList(req.data)
    }, [])

    return (
        <div className='create_group'>

                <label for='group_name'>Название группы</label>
                <input id='group_name' onChange={(e) => { setGroupName(e.target.value) }} value={groupName}></input>
                <div>
                    <div>
                        <h2>Выберете участников</h2>
                        {!usersList ? null
                            : <div class="content">
                                <ul className='user_list'>
                                    {usersList.friends.map(item => {
                                        if (item.initiator._id === props.author) {
                                            return <li className='user_item'
                                                onClick={(e) => { addPartner(e, item.partner._id, item.partner.name) }}>
                                                {item.partner.name}
                                            </li>
                                        }
                                        if (item.partner._id === props.author) {
                                            return <li className='user_item'
                                                onClick={(e) => { addPartner(e, item.initiator._id, item.initiator.name) }}>
                                                {item.initiator.name}
                                            </li>
                                        }
                                    }
                                    )}
                                </ul>
                                <button disabled={partnerArr.length === 0 ? true : false}
                                    onClick={() => {
                                        debugger
                                        createNewGroup()
                                    }}>
                                    Создать группу
                                </button>
                            </div>}
                    </div>
                </div>

        </div>
    )
}

export default CreateGroup;