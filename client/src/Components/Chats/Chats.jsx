import { NavLink } from 'react-router-dom';
import './Chats.css';

function Chats() {
    let contacts=true;

    return <div className='im_dialogs_col_wrap noselect'>
        <div className='im_dialogs_panel'>
            <div className='im_dialogs_search'>
                <input className="form-control im_dialogs_search_field no_outline ng-valid ng-dirty ng-touched ng-empty"></input>
                <a className=''>
                    <i className=''></i>
                </a>
            </div>
        </div>
        <div className='im_dialogs_col' style={{height:'100vh'}}>
            <div className='im_dialogs_wrap nano has-scrollbar active-scrollbar'>
                <div className='im_dialogs_scrollable_wrap nano-content' style={{right:'-17px'}}>
                    {contacts ? <NavLink to='/users'>Добавить</NavLink>
                    :<ul className='nav nav-pills nav-stacked'>
                        <li className='im_dialog_wrap'> 
                            <a className='im_dialog'>
                                <div className='im_dialog_meta pull-right text-right'>
                                    <div className='im_dialog_date'>
                                        12:31 AM
                                    </div>
                                    <span className='im_dialog_badge badge im_dialog_badge_muted'>
                                        1
                                    </span>
                                </div>
                                <div className='im_dialog_photo pull-left peer_photo_init'>
                                    <span className='peer_initials nocopy im_dialog_photo user_bgcolor_5'>
                                        PM
                                    </span>
                                </div>
                                <div className='im_dialog_message_wrap'>
                                    <div className='im_dialog_peer'>
                                        <span className=''>
                                            Влад
                                        </span>
                                    </div>
                                    <div>
                                        <div className="im_dialog_message">
                                            <span>
                                                <span>
                                                    <span className='im_dialog_chat_from_wrap'>
                                                        <span className='im_dialog_chat_from'>
                                                            Вадим
                                                        </span>
                                                        <span>
                                                            :
                                                        </span>
                                                    </span>
                                                </span>
                                            </span>
                                            <span >
                                                <span className='im_short_message_text'>
                                                а, да это просто задание такое))
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>}
                </div>
                <div className='nano-pane' style={{display: 'block'}}>

                </div>
            </div>
        </div>
    </div>
}

export default Chats;