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
            if (dbGet.data.friend.status === false) setBtnTxt(status.pending);
            if (dbGet.data.friend.status === true) setBtnTxt(status.cancel);
        }

        // axios request to server to determine
        // initial relationship of the two users
        // based on response we get from server
        // we update btnTxt
    }, [dbGet.data]);
    // console.log('data', data);

    const handleClick = () => {
        let url = '';
        if (btnTxt === status.none) url = '/profile/request-friend';
        if (btnTxt === status.pending) url = '/profile/cancel-friend';
        if (btnTxt === status.cancel) url = '/profile/cancel-friend';

        console.log('url', url);
        setData({
            url: url,
            values: { id: props.match.params.id },
        });

        /*
            if btnTxt == 'End Friendship' 
            then tell server to end friendship

            if btnTxt == 'Accept Friendship'
            then tell server to begin friendship
            
            Clicking on button does two things:
                1.) make request to server 
                2.) change what the button says (update btnTxt)
        */
    };

    return <button onClick={handleClick}>{btnTxt}</button>;
}

export default FriendButton;
