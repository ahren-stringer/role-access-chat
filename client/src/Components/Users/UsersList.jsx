import axios from 'axios';
import { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import './Users.css';

function UsersList() {
    let [usersList, setUsersList] = useState(null);

    useEffect(async () => {
        let req = await axios.get('http://localhost:8001/users')
        setUsersList(req.data)
    }, [])

    return <div>
        {
            !usersList 
            ? <Preloader/>
            : usersList.map(item=><div>
                <div>
                {item.name}
                </div>
                <div>
                <span>
                        Написать
                    </span>
                    <span>
                        Добавить в группу
                    </span>
                </div>
            </div>)
        }
    </div>
}

export default UsersList;