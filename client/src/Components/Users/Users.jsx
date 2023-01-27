import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Chats from '../Chats/Chats';
import Header from '../Header/Header';
import './Users.css';
import UsersList from './UsersList';
import {
    setSearched, toggleList, loadList, setReqNumber, setSearchedArr, SearchChange,
    searchThunk,
    CloseListThunk
  } from '../../redux/searchReduser';

function Users(props) {

    return <div>
    <div className='Header'>
        <Header />
    </div>
    <div className='im_page_wrap clearfix'>
        <div className='im_page_split clearfix'>
            {/* <Chats/> */}
            <UsersList {...props}/>
        </div>
    </div>
</div>
}

let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        rightsSetingForm: state.groups.rightsSetingForm,
        selectedGroup: state.groups.selectedGroup,
        selectedChanel: state.groups.selectedChanel,
        groupForm: state.groups.groupForm,
        newSearchText: state.search.newSearchText,
        searched: state.search.searched,
        isClosed: state.search.isClosed,
        isListLoading: state.search.isListLoading,
        requestNumber: state.search.requestNumber,
    }
}
export default connect(mapStateToProps, {
    setSearched, toggleList, loadList, setReqNumber, setSearchedArr, SearchChange,
    searchThunk,
    CloseListThunk  })(withRouter(Users));