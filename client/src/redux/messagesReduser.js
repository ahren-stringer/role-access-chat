const SET_MESSAGES = 'messagesReduser/SET_MESSAGES';
const PUSH_MESSAGE = 'messagesReduser/PUSH_MESSAGE';

let init = {
    selected: false,
    messages: [],
};

const messagesReduser = (state = init, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return { ...state, messages: action.messages }
        case PUSH_MESSAGE:
            return { ...state, messages: [...state.messages, action.message] }
        default:
            return state
    }
}

export const setMessages = (messages) => ({ type: SET_MESSAGES, messages });
export const pushMessage = (message) => ({ type: PUSH_MESSAGE, message });

export default messagesReduser