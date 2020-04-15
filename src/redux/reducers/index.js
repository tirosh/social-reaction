// src/reducers/index.js
import { combineReducers } from 'redux';
import user from './userReducer';
import people from './friendsReducer';

export default combineReducers({
    user,
    people,
});
