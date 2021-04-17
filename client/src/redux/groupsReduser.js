const SET_SG = 'groupsReuser/SET_SG';

let init = {
    socketGroup: null,
};

const profileReduser = (state = init, action) => {
    switch (action.type) {
        case SET_SG:
            return {
                ...state,
                name: action.name,
                email: action.email,
                contacts: action.contacts,
                messages: action.messages,
                invites: action.invites,
                groups: action.groups
            }
        default:
            return state
    }
}

export const setProfile = (name, email, contacts, messages, invites, groups) => (
    { type: SET_PROFILE_DATA, name, email, contacts, messages, invites, groups }
);

export default profileReduser