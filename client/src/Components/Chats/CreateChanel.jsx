import { Button, Input } from '@material-ui/core';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { chatAPI } from '../../DAL/api';
import './Chats.css';

function CreateChanel(props) {
    let namesInGroups = [];
    namesInGroups.push(props.selectedGroup.author.name)
    for (let partner of props.selectedGroup.partners) {
        namesInGroups.push(partner)
    }
    //  simpl
    // useEffect(async () => {
    //     let req = await axios.get('http://localhost:8001/friends/' + props.author);
    //     setUsersList(req.data)
    // }, [])

    function Right(type) {
        this.type=type;
        this.prevelegion = false;
        this.listType = null;
        // this.list = list;
        this.group_id=props.selectedGroup._id;
        // this.hightRoleList:{type:Array,default:[]},
    }
    // let [createForm, setCreateForm] = useState(false)
    let [text, setText] = useState('');
    let Chanel = async () => {
        let chanel = await chatAPI.createChanel(props.selectedGroup._id, {
            name: text,
            author: props.author,
            group: props.selectedGroup._id,
            canSee: new Right('canSee'),
            canWrite: new Right('canWrite'),
            canSeeHistory: new Right('canSeeHistory'),
            canSendFile: new Right('canSendFile'),
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
        
        <div className='create_chanel_form'>
            <div className='create_chanel_title'
            // onClick={() => { setCreateForm(!createForm) }}
            >Создать Чат</div>
            {/* {!createForm ? null :  */}
            <div>
            <Input value={text}
                    onChange={(e) => { setText(e.target.value) }} 
                    inputProps={{ 'aria-label': 'description' }} 
                    />
                {/* <input value={text}
                    onChange={(e) => { setText(e.target.value) }}></input> */}
                    <Button onClick={Chanel} className='chanel_btn' variant="contained" color="primary">Создать</Button>
                {/* <button onClick={Chanel}>Создать</button> */}
                {/* <div onClick={() => { props.SetRightsForm('new_chanel') }}>Настроить права доступа</div> */}
            </div>
            {/* } */}
        </div>
    )
}

export default CreateChanel;