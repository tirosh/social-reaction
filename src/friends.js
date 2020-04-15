import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from './redux/actions/friendsActions';

function Friends() {
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
                <ul>
                    {friends.map((person) => (
                        <li key={person.id}>
                            <Link to={`/user/${person.id}`}>
                                <p>
                                    {person.first} {person.last}
                                </p>
                                <img src={person.img_url} />
                            </Link>
                            <button
                                onClick={() => dispatch(unfriend(person.id))}>
                                End Friendship
                            </button>
                        </li>
                    ))}
                </ul>
            )}
            {wannabes && (
                <>
                    <hr />
                    <ul>
                        {wannabes.map((person) => (
                            <li key={person.id}>
                                <Link to={`/user/${person.id}`}>
                                    <p>
                                        {person.first} {person.last}
                                    </p>
                                    <img src={person.img_url} />
                                </Link>
                                <button
                                    onClick={() =>
                                        dispatch(acceptFriendRequest(person.id))
                                    }>
                                    Accept Friend Request
                                </button>
                            </li>
                        ))}
                    </ul>
                </>
            )}

            {!friends && !wannabes && 'Apparently, you have no friends.'}
        </div>
    );
}

export default Friends;
