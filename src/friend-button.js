import React, { useState, useEffect } from 'react';

export function FriendButton() {
    const [buttonText, setButtonText] = useState('Make Friend Request');

    useEffect(() => {
        // axios request to server to determine
        // initial relationship of the two users
        // based on response we get from server
        // we update buttonText
    }, []);

    const handleClick = () => {
        /*
            if buttonText == 'End Friendship' 
            then tell server to end friendship

            if buttonText == 'Accept Friendship'
            then tell server to begin friendship
            
            Clicking on button does two things:
                1.) make request to server 
                2.) change what the button says (update buttonText)
        */
    };

    return <button onClick={handleClick}>{buttonText}</button>;
}
