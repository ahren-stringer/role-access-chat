import Chat from '../Chat/Chat';
import Chats from '../Chats/ChatsContainer';
import Header from '../Header/Header';
import './Main.css';

function Main() {

    return <div>
        <div className='Header'>
            <Header />
        </div>
        <div className='im_page_wrap clearfix'>
            <div className='im_page_split clearfix'>
                {/* <div className='im_dialogs_col_wrap noselect'> */}
                    <Chats />
                {/* </div> */}
                {/* <div className='Chat'> */}
                    <Chat />
                {/* </div> */}
            </div>
        </div>
    </div>
}

export default Main;