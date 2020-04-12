import React, { useState, useEffect } from 'react';
import { useDBget, useDBset } from './hooks/useDB';

function FriendButton(props) {
    const [dbGet, getData] = useDBget(
        `/profile/friend/${props.match.params.id}`
    );
    const [dbSet, setData] = useDBset();
    const [btnTxt, setBtnTxt] = useState('');
    const status = {
        none: 'Send Friend Request',
        pending: 'Cancel Friend Request',
        add: 'Accept Friend Request',
        cancel: 'Unfriend',
    };

    useEffect(() => {
        console.log('data', dbGet.data);
        if (dbGet.data.friend) {
            if (dbGet.data.friend.status === null) setBtnTxt(status.none);
            if (dbGet.data.friend.status === true) setBtnTxt(status.cancel);
            console.log(
                'dbGet.data.friend.recipient_id',
                dbGet.data.friend.recipient_id
            );
            console.log('props.match.params.id', props.match.params.id);
            if (dbGet.data.friend.status === false) {
                if (dbGet.data.friend.recipient_id == props.match.params.id) {
                    setBtnTxt(status.pending);
                } else {
                    setBtnTxt(status.add);
                }
            }
        }
    }, [dbGet.data]);

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
            values: { id: props.match.params.id },
        });
    };

    return <button onClick={handleClick}>{btnTxt}</button>;
}

export default FriendButton;
