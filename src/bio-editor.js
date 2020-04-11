import React, { useState, useEffect } from 'react';
import { useDBset } from './hooks/useDB';

function BioEditor(props) {
    const [{ data, error }, setData] = useDBset();
    const [bioInput, setBioInput] = useState();
    const [editBio, setEditBio] = useState(false);

    useEffect(() => {
        if (data.bio) props.updateProfile({ bio: data.bio });
    }, [data.bio]);

    const submit = () => {
        setData({
            url: '/profile/upload/bio',
            values: { bio: bioInput },
        });
        setEditBio(!editBio);
    };

    const bio = props.bio;
    return !editBio ? (
        <>
            {bio && <p>{bioInput}</p>}
            <button onClick={() => setEditBio(!editBio)}>
                {bio ? 'edit' : 'add your bio'}
            </button>
        </>
    ) : (
        <>
            <label>
                Bio:
                <textarea
                    name='bio'
                    key='bio'
                    placeholder='Once upon a time...'
                    value={bioInput}
                    onChange={(e) => setBioInput(e.target.value)}
                />
            </label>
            <button onClick={submit}>save</button>
            <button onClick={() => setEditBio(!editBio)}>cancel</button>
            {data.err && <div className='error'>{data.err}</div>}
            {error && (
                <div className='error'>Uh, err, something went wrong ...</div>
            )}
        </>
    );
}

export default BioEditor;
