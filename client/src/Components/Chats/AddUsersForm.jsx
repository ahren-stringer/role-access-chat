import axios from 'axios';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
function AddUsersForm() {
    let [usersList, setUsersList] = useState(null);
    let [openList, setOpenList] = useState(false)
    let arr = []
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
        if (arr.some(item => item === name)) {
            arr.splice(arr.indexOf(name), 1)
            e.target.style.backgroundColor = ''
        } else {
            arr.push(name)
            e.target.style.backgroundColor = 'blueviolet'
        }
        console.log(arr)
    }
    return <div>
        <div onClick={seeUserslist}>Пригласить пользователей</div>
        {
            !openList
                ? null
                : <ul>
                    {
                        usersList.map(item=><li onClick={(e)=>{addUser(e,item.name)}}>
                            {item.name}
                        </li>)
                    }
                </ul>

        }
    </div>
}

export default AddUsersForm;