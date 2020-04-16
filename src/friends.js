import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from './redux/actions/friendsActions';

function FriendsWannabes(props) {
    return (
        <div className='users'>
            {props.people.map((person) => (
                <div key={person.id} className='user'>
                    <img src={person.img_url} />
                    <div className='buttons'>
                        <button onClick={props.clickHandler(person.id)}>
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
        <div>
            {friends && (
                <FriendsWannabes
                    people={friends}
                    clickHandler={(person) => dispatch(unfriend(person))}
                />
            )}
            {wannabes && (
                <FriendsWannabes
                    people={wannabes}
                    clickHandler={(person) =>
                        dispatch(acceptFriendRequest(person))
                    }
                />
            )}
            {!friends && !wannabes && 'Apparently, you have no friends.'}
        </div>
    );
}
