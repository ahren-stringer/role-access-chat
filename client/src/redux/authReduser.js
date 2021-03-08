const LOGIN = 'authReuser/LOGIN';
const LOGOUT = 'authReuser/LOGOUT';
const SET_LOADED = 'authReuser/SET-LOADED';
const SET_TOKEN = 'authReuser/SET-TOKEN';
const SET_USER_ID = 'authReuser/SET-LOADED';
const SET_LOGIN = 'authReuser/SET-LOGIN';
const SET_PROFILE_DATA = 'authReuser/SET_PROFILE_DATA';

let init = {
    token: null,
    id: null,
    loaded: false,
    isAuth: false,
    login: () => { },
    //Данные
    name: null,
    email: null,
    contacts: null,
    messages: null,
    invites: null,
    groups: null
};

const authReduser = (state = init, action) => {
    switch (action.type) {
        // case LOGIN:
        //     localStorage.setItem('userData', JSON.stringify({ userId: action.id, token: action.jwtToken }))
        //     return { ...state, userId: action.id, token: action.jwtToken}
        case LOGOUT:
            localStorage.removeItem('userData')
            return { ...state, token: null, userId: null }
        case SET_LOADED:
            return { ...state, loaded: action.loaded }
        case SET_PROFILE_DATA:
            localStorage.setItem('userData', JSON.stringify({ id: action.id, token: action.token }))
            return {
                ...state,
                name: action.name,
                email: action.email,
                contacts: action.contacts,
                messages: action.messages,
                invites: action.invites,
                groups: action.groups,
                token: action.token,
                id:action.id
            }
        case SET_TOKEN:
            return { ...state, token: action.token }
        // case SET_USER_ID:
        //     return { ...state, userId: action.userId }
        case SET_LOGIN:
            return { ...state, login: action.login }
        default:
            return state
    }
}
export const setProfile = (token, id, name, email, contacts, messages, invites, groups) => (
    { type: SET_PROFILE_DATA, token, id, name, email, contacts, messages, invites, groups }
);
export const logout = () => ({ type: LOGOUT, });
export const setLoaded = (loaded) => ({ type: SET_LOADED, loaded });
export const setToken = (token) => ({ type: SET_TOKEN, token });
// export const setUserId = (userId) => ({ type: SET_USER_ID, userId });
export const setLogin = (login) => ({ type: SET_LOGIN, login });


export default authReduser