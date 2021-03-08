import Chats from '../Chats/Chats';
import Header from '../Header/Header';
import './Users.css';
import UsersList from './UsersList';

function Users() {

    return <div>
    <div className='Header'>
        <Header />
    </div>
    <div className='im_page_wrap clearfix'>
        <div className='im_page_split clearfix'>
            <Chats/>
            <UsersList/>
        </div>
    </div>
</div>
}

export default Users;