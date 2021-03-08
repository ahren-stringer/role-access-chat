import './Chat.css';

function Chat() {
    let chosen = true;
    
    return <div className='im_history_col_wrap noselect im_history_loaded'>
        {!chosen ? <div className='im_history_not_selected_wrap'>
            <div className='im_history_not_selected vertical-aligned' style={{ paddingTop: '229px', paddingBottom: '229px' }}>
                Выберите чат для общения
            </div>
        </div>
            : <div className='im_history_selected_wrap'>
                <div className="im_history_wrap nano has-scrollbar active-scrollbar" style={{ height: '481px' }}>
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

                                                        <div class="im_message_body">

                                                            <span class="im_message_author_wrap">
                                                                <span class="copyonly">[<span>7:08:03 PM</span>] </span><a class="im_message_author user_color_5">Viacheslav Barkov</a><span class="copyonly">:</span><span class="im_message_author_admin" style={{display: 'none'}}></span>
                                                            </span>

                                                            <div my-message-body="historyMessage">
                                                                <div class="im_message_text" dir="auto">Всем добрый вечер. Немного спама.</div>
                                                                {/* <div class="im_message_media" style="display: none;"></div>
                                                                <div class="im_message_sign" style="display: none;"></div>
                                                                <div class="im_message_keyboard" style="display: none;"></div> */}
                                                            </div>

                                                        </div>

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
                <div>
                </div>
            </div>
        }
    </div>
}

export default Chat;