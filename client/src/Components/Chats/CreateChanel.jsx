import axios from 'axios';
import { useEffect, useState } from 'react';
import './Chats.css';

function CreateChanel(props) {
    let namesInGroups = [];
    namesInGroups.push(props.selectedGroup.author.name)
    for (let partner of props.selectedGroup.partners) {
        namesInGroups.push(partner.name)
    }
    function Right(type,list) {
        this.type=type;
        this.prevelegion = false;
        this.listType = null;
        this.list = list
    }
    let [createForm, setCreateForm] = useState(false)
    let [text, setText] = useState('');
    let Chanel = async () => {
        let chanel = await axios.post('http://localhost:8001/chanels', {
            name: text,
            author: props.author,
            group: props.selectedGroup._id,
            canSee: new Right('canSee',[...namesInGroups]),
            canWrite: new Right('canWrite',[...namesInGroups]),
            canSeeHistory: new Right('canSeeHistory',[...namesInGroups]),
            canSendFile: new Right('canSendFile',[...namesInGroups]),
            canAddUsers: new Right('canAddUsers',[]),
            canDeleteUsers: new Right('canDeleteUsers',[]),
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
            <div onClick={() => { setCreateForm(!createForm) }}>Создать Канал</div>
            {!createForm ? null : <div>
                <input value={text}
                    onChange={(e) => { setText(e.target.value) }}></input>
                <button onClick={Chanel}>Создать</button>
                <div onClick={() => { props.SetRightsForm('new_chanel') }}>Настроить права доступа</div>
            </div>}
        </div>
    )
}

export default CreateChanel;