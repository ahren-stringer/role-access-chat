import { connect } from 'react-redux';
import ChatContainer from '../Chat/ChatContainer';
import RightsSetingForm from '../Chat/RightsSetingForm';
import Chats from '../Chats/ChatsContainer';
import Groups from '../Chats/Groups';
import Header from '../Header/Header';
import './Main.css';

function Main(props) {

    return <div>
        <div className='Header'>
            <Header />
        </div>
        <div className='im_page_wrap clearfix'>
            {!props.rightsSetingForm ? <RightsSetingForm/>
            :<div className='im_page_split clearfix'>
                <Groups/>
                {/* <div className='im_dialogs_col_wrap noselect'> */}
                    <Chats />
                {/* </div> */}
                {/* <div className='Chat'> */}
                    <ChatContainer />
                {/* </div> */}
            </div>}
        </div>
    </div>
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        rightsSetingForm: state.groups.rightsSetingForm,
    }
}
export default connect(mapStateToProps, {})(Main);