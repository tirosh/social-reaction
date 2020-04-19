import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    receiveFriendsWannabes,
    acceptFriendRequest,
    unfriend,
} from '../redux/actions/friendsActions';

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
                <span>Friends Component</span>
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
    const dispatch = useDispatch();
    return (
        <div className={props.className}>
            <div className='friends-wannabes tag'>
                <span>FriendsWannabes Component</span>
            </div>
            <div className='friends-wannabes content'>
                {props.people.map((person) => (
                    <Userstamp
                        user={person}
                        className='userstamp component medium'
                    />
                    // <div key={person.id} className='user'>
                    //     <p>
                    //         {person.first} {person.last}
                    //     </p>
                    //     <Link to={`/user/${person.id}`}>
                    //         <img src={person.img_url} />
                    //     </Link>

                    //     <div className='buttons'>
                    //         <button
                    //             onClick={() =>
                    //                 dispatch(props.handleClick(person.id))
                    //             }>
                    //             {person.accepted
                    //                 ? 'End Friendship'
                    //                 : 'Accept Friend Request'}
                    //         </button>
                    //     </div>
                    // </div>
                ))}
            </div>
        </div>
    );
}

function Userstamp(props) {
    return (
        <div key={props.user.id} className={props.className}>
            <div className='userstamp tag'>
                <span>Userstamp Component</span>
            </div>
            <div className='userstamp content'>
                <p>
                    {props.user.first} {props.user.last}
                </p>
                <Link to={`/user/${props.user.id}`}>
                    <div className='image'>
                        <img src={props.user.img_url} />
                    </div>
                </Link>

                <div className='buttons'>
                    <button
                        onClick={() =>
                            dispatch(props.handleClick(props.user.id))
                        }>
                        {props.user.accepted
                            ? 'End Friendship'
                            : 'Accept Friend Request'}
                    </button>
                </div>
            </div>
        </div>
    );
}
