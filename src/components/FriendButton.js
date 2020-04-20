import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    requestFriend,
    acceptFriendRequest,
    unfriend,
} from '../redux/actions/friendsActions';

export default function FriendButton(props) {
    const dispatch = useDispatch();
    const profile = useSelector((state) => state.profile && state.profile);

    const [btnTxt, setBtnTxt] = useState('');
    const status = {
        none: 'Send Friend Request',
        pending: 'Cancel Friend Request',
        add: 'Accept Friend Request',
        cancel: 'Unfriend',
    };

    useEffect(() => {
        if (props.user) {
            if (props.user.accepted === null) {
                setBtnTxt(status.none);
            } else if (props.user.accepted === true) {
                setBtnTxt(status.cancel);
            } else if (props.user.accepted === false) {
                if (props.user.frnd_sender_id === profile.id) {
                    setBtnTxt(status.pending);
                } else {
                    setBtnTxt(status.add);
                }
            }
        }
    }, [props.user]);

    const handleClick = async () => {
        if (btnTxt === status.none) {
            dispatch(requestFriend(props.user.id));
            setBtnTxt(status.pending);
        } else if (btnTxt === status.pending || btnTxt === status.cancel) {
            dispatch(unfriend(props.user.id));
            setBtnTxt(status.none);
        } else if (btnTxt === status.add) {
            dispatch(acceptFriendRequest(props.user.id));
            setBtnTxt(status.cancel);
        }
    };

    return (
        <>
            {props.user != 0 && (
                <div className='friend-button component'>
                    <div className='friend-button tag'>
                        <span>FriendButton</span>
                    </div>
                    <div className='friend-button content'>
                        <button onClick={handleClick}>{btnTxt}</button>
                    </div>
                </div>
            )}
        </>
    );
}
