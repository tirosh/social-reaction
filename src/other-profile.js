import React, { useEffect } from 'react';
import { useDBget } from './hooks/useDB';

function OtherProfile(props) {
    const [{ data, error }, getData] = useDBget(
        `/profile/user/${props.match.params.id}`
    );

    useEffect(() => {
        if (data.redirect) props.history.push('/');
    }, [data]);

    const { first, last, img_url, bio } = data;
    return (
        <>
            <h2>OtherProfile</h2>
            {data.err && <div className='error'>{data.err}</div>}
            {error && <div>Uh, err, something went wrong ...</div>}
            <div className='user profile image medium'>
                <img
                    src={img_url || '/img/lego.svg'}
                    alt={`${first} ${last}`}
                />
            </div>
            <div>
                <h3>
                    {first} {last}
                </h3>
                {bio && <p>{bio}</p>}
            </div>
        </>
    );
}

export default OtherProfile;
