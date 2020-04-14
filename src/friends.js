import React, { useState, useEffect } from 'react';
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';

function Friends(props) {
    const dispatch = useDispatch();
    const friendsWannabes = useSelector(
        (state) => state.user && state.user.friendsWannabes
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    useEffect(() => {
        console.log('friendsWannabes', friendsWannabes);
    }, [friendsWannabes]);

    return <div>{'Apparently, you have no friends.'}</div>;
}

export default Friends;
