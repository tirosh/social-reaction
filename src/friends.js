import React, { useState, useEffect } from 'react';
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from './redux/actions/friendsActions';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Friends(props) {
    const dispatch = useDispatch();
    const friendsWannabes = useSelector(
        (state) => state.friends.friendsWannabes
    );
    const [friends, setFriends] = useState([]);
    const [wannabes, setWannabes] = useState([]);

    useEffect(() => {
        dispatch(receiveFriendsWannabes());
    }, []);

    useEffect(() => {
        console.log('friendsWannabes', friendsWannabes);
        if (friendsWannabes) {
            setFriends(friendsWannabes.filter((person) => person.accepted));
            setWannabes(friendsWannabes.filter((person) => !person.accepted));
        }
    }, [friendsWannabes]);

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
