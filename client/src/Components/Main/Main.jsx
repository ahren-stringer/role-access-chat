import { connect } from 'react-redux';
import ChatContainer from '../Chat/ChatContainer';
import RightsSetingForm from './RightsSetingForm';
import Chats from '../Chats/ChatsContainer';
import Groups from '../Chats/Groups';
import Header from '../Header/Header';
import './Main.css';
import { SetRightsForm } from '../../redux/groupsReduser'
import GroupSetingForm from './GroupSetingForm';

function Main(props) {
    debugger
    return <div>
        <div className='Header'>
            <Header />
        </div>
        <div className='im_page_wrap clearfix'>
            {props.rightsSetingForm ? <RightsSetingForm />
                : props.groupForm ? <GroupSetingForm />
                    : <div className='im_page_split clearfix'>
                        <Groups />
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
        selectedGroup: state.groups.selectedGroup,
        selectedChanel: state.groups.selectedChanel,
        groupForm: state.groups.groupForm
    }
}
export default connect(mapStateToProps, { SetRightsForm })(Main);