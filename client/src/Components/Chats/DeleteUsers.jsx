import axios from 'axios';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
function AddUsersForm(props) {
    let [usersList, setUsersList] = useState(null);
    let [openList, setOpenList] = useState(false)
    let arr = []
    let [partnerArr, setPartner] = useState([]);
    let [roles, setRoles] = useState([]);
    let [allow,setAllow]=useState(props.role)
    // if (JSON.parse(localStorage.getItem('role')).role==='admin'
    // ||JSON.parse(localStorage.getItem('role')).role==='moderator'){
    //     setAllow(JSON.parse(localStorage.getItem('role')).role_key)
    // }
    let seeUserslist = async () => {
        if (!usersList) {
            let req = await axios.get('http://localhost:8001/users')
            setUsersList(req.data)
            setOpenList(true)
        } else {
            setOpenList(false)
        }
    }
    let addUser = (e, name) => {
        let role = {
            role: 'partner',
            user_name: name,
            group_id: props.selectedGroup._id
        }
        if (partnerArr.some(item => item === name)) {
            let index = partnerArr.indexOf(name);
            setPartner(name.splice(index, 1))
            setRoles(roles.splice(index, 1))
            e.target.style.backgroundColor = ''
        } else {
            setPartner([...partnerArr, name])
            setRoles([...roles, role])
            e.target.style.backgroundColor = 'blueviolet'
        }
        console.log(arr)
        console.log(roles)
    }
    let sendUsers = async () => {
        let body;
        if (props.role='admin'){
            body= {
                new_parters: partnerArr,
                roles,
                role: "partner"
            };
        }else{
            body= {
                new_parters: partnerArr,
                roles,
                role: 'invited'
            };
        }
        await axios.put('http://localhost:8001/group_add_user/' + props.selectedGroup._id, body ,
                {
                    headers: {
                        'Role-Access': 'Access '+ allow
                    }
                })
        setOpenList(false)
    }
    return <div>
        <div onClick={seeUserslist}>{props.title}</div>
        {
            !openList
                ? null
                : <div>
                    <ul>
                        {
                            usersList.map(item => <li onClick={(e) => { addUser(e, item.name) }}>
                                {item.name}
                            </li>)
                        }
                    </ul>
                    <button
                        disabled={partnerArr.length === 0 ? true : false}
                        onClick={sendUsers}
                    >
                        Добавить
                    </button>
                </div>
        }
    </div>
}

export default AddUsersForm;