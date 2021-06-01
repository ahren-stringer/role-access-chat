import './Chat.css';
import { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-ui/core';

function Chat(props) {
    debugger
    console.log(props.onlineGroupUsers)
    let [text, setText] = useState('');
    let rights = props.selectedChanel.rights;
    let [filesArr, setFilesArr] = useState([]);

    let sendMessage = async () => {
        let formData=new FormData();
        formData.append('text',text)
        formData.append('user', props.author)
        formData.append('chat', props.selectedChanel._id)
        filesArr.forEach(function(file, i) {
            formData.append('files', file);
        });
        // formData.append('files', filesArr);
        debugger
        let message = await axios.post('http://localhost:8001/messages', formData)
        // {
        //     text,
        //     user: props.author,
        //     chat: props.selectedChanel,
        //     // onlineGroupUsers: props.onlineGroupUsers
        // })
        props.pushMessage(message.data)
        // for (let user of props.onlineGroupUsers) {

        //     socket.emit("send message", {
        //         content: {
        //             chanel: props.selectedChanel,
        //             group: props.selectedGroup,
        //             message: message.data
        //         },
        //         to: user.userID,
        //     });
        // }
        // socket.on("chat message", ({ content, from }) => {
        //     console.log(content, from)
        // });

    };
    return <div className='im_history_col_wrap noselect im_history_loaded'>
        {!props.selected ? <div className='im_history_not_selected_wrap'>
            <div className='im_history_not_selected vertical-aligned' style={{ paddingTop: '229px', paddingBottom: '229px' }}>
                Выберите чат для общения
            </div>
        </div>
            : <div className='im_history_selected_wrap'>
                <div className="im_history_wrap nano has-scrollbar active-scrollbar">
                    <div className='im_history_scrollable_wrap nano-content' style={{ marginRight: '-17px' }}>
                        <div className=''>
                            <div className='im_history im_history_selectable'>
                                <div classNmae="im_history_messages im_history_messages_group">
                                    {/* Loading More */}
                                    <div className='im_history_messages_peer'>
                                        {/* Сообщения */}
                                        <div className='im_history_message_wrap'>
                                            {/* Дата */}
                                            <div class="im_message_outer_wrap hasselect">

                                                <div class="im_message_wrap clearfix" >

                                                    <div>
                                                        <i class="icon icon-select-tick"></i>

                                                        <a class="im_message_from_photo pull-left peer_photo_init"><span class="peer_initials nocopy im_message_from_photo user_bgcolor_5"></span></a>

                                                        <div class="im_message_meta pull-right text-right noselect">

                                                            <span class="im_message_date clickable">
                                                                <span class="im_message_edited"></span>
                                                                <span class="im_message_date_text nocopy"></span>
                                                            </span>
                                                        </div>
                                                        {/* <div>
                                                            {!props.selectedChanel
                                                                ? <Preloader />
                                                                : props.selectedChanel.name
                                                            }
                                                        </div> */}
                                                        {props.messages.map(item => <div class="im_message_body">

                                                            <span className='message_name'>{item.user.name}</span>

                                                            <div className="historyMessage">
                                                                <div class="im_message_text" dir="auto">{item.text}</div>
                                                            </div>
                                                            {
                                                                item.files.length===0? null
                                                                : <div>
                                                                    {item.files.map(item=><div>
                                                                    <a href={'http://localhost:8001/file/'+item.file.destination+item.file.filename}
                                                                    download
                                                                    >
                                                                        {item.file.originalname}
                                                                    </a>
                                                                    </div>)}
                                                                </div> 
                                                            }

                                                        </div>)}

                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        {/* Cообщение */}
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className=''>

                    </div>
                </div>
                {/* {Acces(rights.canWrite) ? */}
                <div className='files_list'>
                {
                    filesArr.length==0? null
                    :filesArr.map(item=><div>{item.name}</div>)
                }
                </div>
                <div className='send_message_form'>
                    <textarea name="" id="" cols="30" rows="10"
                        value={text}
                        onChange={(e) => { setText(e.target.value) }}
                        className='textarea'
                    ></textarea>
                    {/* <span className='send_btn' >
                        <div> */}
                            <Button variant="contained" color="primary" className='send_btn' onClick={sendMessage}>
                                Отправить
                            </Button>
                        {/* </div>
                        <div> */}
                            <input type='file' id="file" className="inputfile" name="file"
                            multiple
                                onChange={(e) => { 
                                    console.log(e.target.files[0])
                                    setFilesArr([...filesArr,e.target.files[0]]) 
                                }}
                                // className='send_btn'
                            ></input>
                            <label for="file">Выберите изображение</label>
                        {/* </div>
                    </span> */}
                    {/* <button onClick={sendMessage}>Отправить</button> */}
                    {/* :<div>У вас отключена возможность писать в этом чате</div>} */}
                </div>
            </div>
        }
    </div>
}

export default Chat;