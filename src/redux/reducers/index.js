// src/reducers/index.js
import { combineReducers } from 'redux';
import ui from './uiReducer';
import profile from './profileReducer';
import users from './userReducer';
import people from './friendsReducer';
import messages from './messageReducer';

export default combineReducers({
    ui,
    profile,
    users,
    people,
    messages,
});
