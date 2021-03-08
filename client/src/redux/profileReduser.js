const SET_PROFILE_DATA = 'authReuser/SET_PROFILE_DATA';

let init = {
    name: null,
    email: null,
    contacts: null,
    messages: null,
    invites: null,
    groups: null
};

const profileReduser = (state = init, action) => {
    switch (action.type) {
        case SET_PROFILE_DATA:
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