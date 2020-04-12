import React, { useState, useEffect } from 'react';
import { useDBget, useDBset } from './hooks/useDB';

function FriendButton(props) {
    const [dbGet, getData] = useDBget(`/profile/friend/${props.id}`);
    const [dbSet, setData] = useDBset();
    const [btnTxt, setBtnTxt] = useState('');
    const status = {
        none: 'Send Friend Request',
        pending: 'Cancel Friend Request',
        add: 'Accept Friend Request',
        cancel: 'Unfriend',
    };

    useEffect(() => {
        let friend = dbGet.data.friend;
        if (friend) {
            if (friend.status === null) setBtnTxt(status.none);
            if (friend.status === true) setBtnTxt(status.cancel);
            if (friend.status === false) {
                if (friend.recipient_id == props.id) {
                    setBtnTxt(status.pending);
                } else {
                    setBtnTxt(status.add);
                }
            }
        }
    }, [dbGet.data.friend]);

    const handleClick = async () => {
        let url = '';
        if (btnTxt === status.none) {
            url = '/profile/request-friend';
            setBtnTxt(status.pending);
        } else if (btnTxt === status.pending || btnTxt === status.cancel) {
            url = '/profile/cancel-friend';
            setBtnTxt(status.none);
        } else if (btnTxt === status.add) {
            url = '/profile/add-friend';
            setBtnTxt(status.cancel);
        }
        setData({
            url: url,
            values: { id: props.id },
        });
    };

    return <button onClick={handleClick}>{btnTxt}</button>;
}

export default FriendButton;
