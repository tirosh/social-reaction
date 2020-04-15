// src/reducers/index.js
import { combineReducers } from 'redux';
import friendsRecucer from './friendsReducer';

export default combineReducers({
    friends: friendsRecucer,
});
