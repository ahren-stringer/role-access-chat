import { SetRightsForm } from '../../redux/groupsReduser'
import { connect } from 'react-redux';
import SingleRightSettings from "./SingleRightSettings";
import SingleGroupSettings from './SingleGroupSettings';
function GroupSetingForm(props) {

    return <div style={{ height: '100vh' }}>
        <span onClick={() => { props.SetRightsForm(false) }}>Закрыть</span>
        <h3>Роли</h3>
        <ul>
            <li>
                <SingleGroupSettings
                title='Назначить администраоров'
                role='admins'
                userId={props.author}
                name={props.name}
                group={props.selectedGroup}
                />
                <SingleGroupSettings
                title='Назначить модераторов'
                role='moderators'
                group={props.selectedGroup}
                userId={props.author}
                name={props.name}
                />
                <SingleGroupSettings
                title='Назначить простым пользователем'
                role='partner'
                userId={props.author}
                group={props.selectedGroup}
                name={props.name}
                />
            </li>
        </ul>
    </div>
}
let mapStateToProps = (state) => {
    return {
        author: state.auth.id,
        name: state.auth.name,
        rightsSetingForm: state.groups.rightsSetingForm,
        selectedGroup: state.groups.selectedGroup,
        selectedChanel: state.groups.selectedChanel,
    }
}
export default connect(mapStateToProps, { SetRightsForm })(GroupSetingForm);