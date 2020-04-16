// src/reducers/index.js
import { combineReducers } from 'redux';
import ui from './uiReducer';
import user from './userReducer';
import people from './friendsReducer';

export default combineReducers({
    ui,
    user,
    people,
});
