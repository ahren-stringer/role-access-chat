import axios from 'axios';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './Chats.css';
import Search from './Search';
import SingleChat from './SingleChat';

function CreateGroup(props) {

    let [createGroupPooup, setCreateGroupPooup] = useState(false);
    let [usersList, setUsersList] = useState(null);
    let [partnerArr, setPartner] = useState([]);
    let arr=[];
    let roleArr=[];
    let [groupName, setGroupName] = useState('');
    let [roles, setRoles] = useState([
        {
            role: 'admin',
            user_name:props.name
        }
    ]);

    let createGroup = async () => {
        if (createGroupPooup) { setCreateGroupPooup(false) }
        else {
            let req = await axios.get('http://localhost:8001/users')
            setUsersList(req.data)
            setCreateGroupPooup(true)
        }
    }
    let addPartner = (partnerId, partnerName) => {
        let role = {
            role: 'partner',
            user_name:partnerName
        }
        if(arr.some(item=>item===partnerName)){
            let index=arr.indexOf(partnerName);
            setPartner(partnerArr.splice(index,1))
            setRoles(roles.splice(index,1))
        }else{
            setPartner([...partnerArr,partnerName])
            setRoles([...roles,role])
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
        setCreateGroupPooup(false)
    }
    let [groups, setGroups] = useState(null);

    useEffect(async () => {
        let req = await axios.get('http://localhost:8001/groups/' + props.author);
        setGroups(req.data)
    }, [])
    return (
    <div>
        <div onClick={createGroup}>
                            Создать группу
                        </div>
                        {
                            !createGroupPooup ? null 
                            : <div>
                                <label for='group_name'>Название группы</label>
                                <input id='group_name' onChange={(e)=>{setGroupName(e.target.value)}} value={groupName}></input>
                                <div>Добавить участников</div>
                                <div>
                                    {partnerArr.length===0 ? null
                                    : partnerArr.map(item=><span>
                                        {/* {item.name} */}
                                        {item}
                                    </span>)}
                                </div>

                                <button disabled={partnerArr.length===0? true :false}
                                onClick={()=>{
                                    debugger
                                    createNewGroup()}}>
                                    Создать группу
                                </button>

                                <ul>
                                    {usersList
                                    .filter(item=>item._id !== props.author)
                                    .map(item=><li onClick={()=>{addPartner(item._id,item.name)}}>
                                        {item.name}
                                    </li>)}
                                </ul>
                            </div>
                        }
    </div>

    )
}

export default CreateGroup;