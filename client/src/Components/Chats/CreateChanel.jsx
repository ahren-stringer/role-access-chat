import axios from 'axios';
import { useEffect, useState } from 'react';
import './Chats.css';

function CreateChanel(props) {
    let namesInGroups = [];
    namesInGroups.push(props.selectedGroup.author.name)
    for (let partner of props.selectedGroup.partners) {
        namesInGroups.push(partner.name)
    }
    let rights={
        users: {
            witelist:[...namesInGroups],
            blacklist: null
        },
        canWrite: {
            witelist:[...namesInGroups],
            blacklist: null
        },
        canSeeHistory: {
            witelist:[...namesInGroups],
            blacklist: null
        },
        canSendFile: {
            witelist:[...namesInGroups],
            blacklist: null
        },
        canAddUsers: {
            witelist:[namesInGroups[0]],
            blacklist: null
        },
        canDeleteUsers: {
            witelist:[namesInGroups[0]],
            blacklist: null
        },
    }
    let [createForm, setCreateForm]=useState(false)
    let [text, setText] = useState('');
    let Chanel = async () => {
        let chanel=await axios.post('http://localhost:8001/chanels', {
            name:text,
            author: props.author,
            group:props.selectedGroup._id,
            rights,
        })
        // for (let user of props.onlineGroupUsers) {

        //     socket.emit("chat message", {
        //         content: message,
        //         to: user.userID,
        //     });
        // }
        // socket.on("chat message", ({ content, from }) => {
        //     console.log(content,from)
        // });

    };
    return (
        <div>
            <div onClick={()=>{setCreateForm(!createForm)}}>Создать Канал</div>
            {!createForm ? null : <div>
                <input value={text}
                        onChange={(e) => { setText(e.target.value) }}></input>
                        <button onClick={Chanel}>Создать</button>
                <div onClick={() => { props.SetRightsForm(true) }}>Настроить права доступа</div>
            </div>}
        </div>
    )
}

export default CreateChanel;