import authReduser from "./authReduser";
import { reducer as formReducer } from 'redux-form'
import profileReduser from "./profileReduser";

const { createStore, combineReducers, applyMiddleware } = require("redux");

let redusers= combineReducers({
    auth: authReduser,
    profile: profileReduser,
    form: formReducer,
});

let store=createStore(redusers);

export default store