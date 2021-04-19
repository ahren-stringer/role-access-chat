const SET_GROUPS = 'groupsReuser/SET_GROUPS';
const SET_SELECTED = 'groupsReuser/SET_SELECTED';
const SET_SELECTED_GROUP = 'groupsReuser/SET_SELECTED_GROUP';

let init = {
    selected: false,
    groups: null,
    selectedGroup: null,
};

const groupsReuser = (state = init, action) => {
    switch (action.type) {
        case SET_GROUPS:
            return { ...state, groups: action.groups }
        case SET_SELECTED:
            return { ...state, selected: action.selected }
        case SET_SELECTED_GROUP:
            return { ...state, selectedGroup: action.selectedGroup }
        default:
            return state
    }
}

export const setGroups = (groups) => ({ type: SET_GROUPS, groups });
export const setSelected = (selected) => ({ type: SET_SELECTED, selected });
export const setSelectedGroup = (selectedGroup) => ({ type: SET_SELECTED_GROUP, selectedGroup });

export default groupsReuser