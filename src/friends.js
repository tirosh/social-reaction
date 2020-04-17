import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from './redux/actions/friendsActions';

function FriendsWannabes(props) {
    const dispatch = useDispatch();
    return (
        <div className={props.className}>
            {props.people.map((person) => (
                <div key={person.id} className='user'>
                    <img src={person.img_url} />
                    <div className='buttons'>
                        <button
                            onClick={() =>
                                dispatch(props.handleClick(person.id))
                            }>
                            {person.accepted
                                ? 'End Friendship'
                                : 'Accept Friend Request'}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function Friends() {
    const dispatch = useDispatch();
    const friends = useSelector(
        (state) =>
            state.people.friendsWannabes &&
            state.people.friendsWannabes.filter((person) => person.accepted)
    );
    const wannabes = useSelector(
        (state) =>
            state.people.friendsWannabes &&
            state.people.friendsWannabes.filter((person) => !person.accepted)
    );

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    return (
        <div className='friends-wannabes'>
            {friends && (
                <FriendsWannabes
                    className='friends'
                    people={friends}
                    handleClick={unfriend}
                />
            )}
            {friends && wannabes && <hr />}
            {wannabes && (
                <FriendsWannabes
                    className='wannabes'
                    people={wannabes}
                    handleClick={acceptFriendRequest}
                />
            )}
            {!friends &&
                !wannabes &&
                'Apparently, you have no friends or wannabes.'}
        </div>
    );
}
