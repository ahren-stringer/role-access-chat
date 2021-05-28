import authReduser from "./authReduser";
import { reducer as formReducer } from 'redux-form'
import profileReduser from "./profileReduser";
import groupsReuser from "./groupsReduser";
import messagesReduser from "./messagesReduser";
import searchReduser from "./searchReduser";
import thunkMiddleware from "redux-thunk"

const { createStore, combineReducers, applyMiddleware } = require("redux");

let redusers= combineReducers({
    auth: authReduser,
    profile: profileReduser,
    groups:groupsReuser,
    messages:messagesReduser,
    search:searchReduser,
    form: formReducer,
});
let store=createStore(redusers,applyMiddleware(thunkMiddleware));

export default store