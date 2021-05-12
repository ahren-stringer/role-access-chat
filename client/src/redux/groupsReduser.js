const SET_GROUPS = 'groupsReuser/SET_GROUPS';
const SET_SELECTED = 'groupsReuser/SET_SELECTED';
const SET_SELECTED_GROUP = 'groupsReuser/SET_SELECTED_GROUP';
const SET_ONLINE_GROUP_USERS = 'groupsReuser/SET_ONLINE_GROUP_USERS';
const DELETE_ONLINE_GROUP_USER = 'groupsReuser/DELETE_ONLINE_GROUP_USER';
const SET_RIGHTS_FORM = 'groupsReuser/SET_RIGHTS_FORM';
const SET_CHANELS = 'groupsReuser/SET_CHANELS';
const SET_SELECTED_CHANEL = 'groupsReuser/SET_SELECTED_CHANEL';
const GROUP_FORM = 'groupsReuser/GROUP_FORM';
const ROLE = 'groupsReuser/ROLE';

let init = {
    selected: false,
    groups: null,
    selectedGroup: null,
    selectedChanel: null,
    onlineGroupUsers: [],
    chanels: null,
    rightsSetingForm: null,
    groupForm: null,
    role: null,
    rights: {
        whitelist: [],
        canWrite: [],
        canSeeHistory: [],
        canSendFile: [],
        canAddUsers: [],
        canDeleteUsers: [],
    },
};

const groupsReuser = (state = init, action) => {
    switch (action.type) {
        case SET_GROUPS:
            return { ...state, groups: action.groups }
        case SET_SELECTED:
            return { ...state, selected: action.selected }
        case SET_SELECTED_GROUP:
            window.selectedGroup = action.selectedGroup
            return { ...state, selectedGroup: action.selectedGroup }
        case SET_SELECTED_CHANEL:
            window.selectedChanel = action.selectedChanel
            return { ...state, selectedChanel: action.selectedChanel }
        case SET_RIGHTS_FORM:
            return { ...state, rightsSetingForm: action.rightsSetingForm }
        case SET_CHANELS:
            return { ...state, chanels: action.chanels }
        case GROUP_FORM:
            return { ...state, groupForm: action.groupForm }
        case SET_ONLINE_GROUP_USERS:
            // let prev = state.onlineGroupUsers;
            // let act = action.onlineGroupUsers;
            // if (act.length == 1) {
            //     for (let user of prev) {
            //         debugger
            //         if (user.username == act.username) return {
            //             ...state,
            //             onlineGroupUsers: [...prev]
            //         }
            //     }
            // }
            return {
                ...state,
                onlineGroupUsers: [...state.onlineGroupUsers, ...action.onlineGroupUsers]
            }
        case DELETE_ONLINE_GROUP_USER:
            let arr = [...state.onlineGroupUsers];
            let index = arr.find(item => item.username == action.disconnectedGroupUser.username);
            if (index) arr
                .splice(arr
                    .indexOf(index), 1)
            return {
                ...state,
                onlineGroupUsers: arr
            }
        case ROLE:
            // let role;
            // outer:for (let key in action.group){
            //     if(typeof action.group[key]==='object'){
            //         for(let i=0;i<action.group[key].length;i++){
            //             if (action.group[key][i]==action.name){
            //                 debugger
            //                 role=key
            //                 break outer
            //             }
            //         }
            //     }
            // }
            return {...state,role:action.role}
        default:
            return state
    }
}

export const setGroups = (groups) => ({ type: SET_GROUPS, groups });
export const setSelected = (selected) => ({ type: SET_SELECTED, selected });
export const setSelectedGroup = (selectedGroup) => ({ type: SET_SELECTED_GROUP, selectedGroup });
export const setOnlineGroupUsers = (onlineGroupUsers) => ({ type: SET_ONLINE_GROUP_USERS, onlineGroupUsers });
export const deleteOnlineGroupUsers = (disconnectedGroupUser) => ({ type: DELETE_ONLINE_GROUP_USER, disconnectedGroupUser });
export const SetRightsForm = (rightsSetingForm) => ({ type: SET_RIGHTS_FORM, rightsSetingForm });
export const setChanels = (chanels) => ({ type: SET_CHANELS, chanels });
export const setSelectedChanel = (selectedChanel) => ({ type: SET_SELECTED_CHANEL, selectedChanel });
export const setGroupSettingsForm = (groupForm) => ({ type: GROUP_FORM, groupForm });
export const defineRole = (role) => ({ type: ROLE, role });
export default groupsReuser