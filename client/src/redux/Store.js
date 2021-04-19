import authReduser from "./authReduser";
import { reducer as formReducer } from 'redux-form'
import profileReduser from "./profileReduser";
import groupsReuser from "./groupsReduser";
import messagesReduser from "./messagesReduser";

const { createStore, combineReducers, applyMiddleware } = require("redux");

let redusers= combineReducers({
    auth: authReduser,
    profile: profileReduser,
    groups:groupsReuser,
    messages:messagesReduser,
    form: formReducer,
});

let store=createStore(redusers);

export default store