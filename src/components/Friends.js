import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from '../redux/actions/friendsActions';
import User from './User';

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
        <div className='friends component'>
            <div className='friends tag'>
                <span>Friends</span>
            </div>
            <div className='friends content'>
                {friends && (
                    <FriendsWannabes
                        className='friends-wannabes component friends'
                        people={friends}
                        handleClick={unfriend}
                    />
                )}
                {wannabes && (
                    <FriendsWannabes
                        className='friends-wannabes component wannabes'
                        people={wannabes}
                        handleClick={acceptFriendRequest}
                    />
                )}
                {!friends &&
                    !wannabes &&
                    'Apparently, you have no friends or wannabes.'}
            </div>
        </div>
    );
}

function FriendsWannabes(props) {
    return (
        <>
            {props.people != 0 && (
                <div className={props.className}>
                    <div className='friends-wannabes tag'>
                        <span>FriendsWannabes</span>
                    </div>
                    <div className='friends-wannabes content'>
                        {props.people.map((person) => (
                            <User
                                user={person}
                                key={person.id}
                                className='user component medium'
                                button={'FriendButton'}
                                name={true}
                            />
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
