const SET_MESSAGES = 'messagesReduser/SET_MESSAGES';

let init = {
    selected: false,
    messages: [],
};

const messagesReduser = (state = init, action) => {
    switch (action.type) {
        case SET_MESSAGES:
            return { ...state, messages: action.messages }
        default:
            return state
    }
}

export const setMessages = (messages) => ({ type: SET_MESSAGES, messages });

export default messagesReduser