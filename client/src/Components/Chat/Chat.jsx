import './Chat.css';
import { io } from "socket.io-client";
import { socket } from '../../App';
import Preloader from '../Preloader/Preloader';
import { useEffect, useState } from 'react';
import axios from 'axios';
function Chat(props) {
    debugger
    console.log(props.onlineGroupUsers)
    let [text, setText] = useState('');
    let rights = props.selectedChanel.rights;
    // let  [messages, setMessages]=useState(props.messages);
    // useEffect(()=>{
    //     setMessages(props.messages)
    // },[props.messages])
    let sendMessage = async () => {
        let message = await axios.post('http://localhost:8001/messages', {
            text,
            user: props.author,
            chat: props.selectedChanel,
            // onlineGroupUsers: props.onlineGroupUsers
        })
        props.pushMessage(message.data)
        for (let user of props.onlineGroupUsers) {

            socket.emit("send message", {
                content: {
                    chanel:props.selectedChanel,
                    group:props.selectedGroup,
                    message:message.data
                },
                to: user.userID,
            });
        }
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
                <div className="im_history_wrap nano has-scrollbar active-scrollbar" style={{ height: '370px' }}>
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
                                                        <div>
                                                            {!props.selectedChanel
                                                                ? <Preloader />
                                                                : props.selectedChanel.name
                                                            }
                                                        </div>
                                                        {props.messages.map(item => <div class="im_message_body">

                                                            <span class="im_message_author_wrap">
                                                                <span class="copyonly">[<span>{item.createdAt}</span>] </span><a class="im_message_author user_color_5">{item.user.name}</a><span class="copyonly">:</span><span class="im_message_author_admin" style={{ display: 'none' }}></span>
                                                            </span>

                                                            <div my-message-body="historyMessage">
                                                                <div class="im_message_text" dir="auto">{item.text}</div>
                                                                {/* <div class="im_message_media" style="display: none;"></div>
                                                                <div class="im_message_sign" style="display: none;"></div>
                                                                <div class="im_message_keyboard" style="display: none;"></div> */}
                                                            </div>

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
                <div className=''>
                    {/* {Acces(rights.canWrite) ? */}<div> 
                        <button onClick={sendMessage}>Отправить</button>
                        <textarea name="" id="" cols="30" rows="10"
                            value={text}
                            onChange={(e) => { setText(e.target.value) }}></textarea>
                    </div>
                    {/* :<div>У вас отключена возможность писать в этом чате</div>} */}
                </div>
            </div>
        }
    </div>
}

export default Chat;