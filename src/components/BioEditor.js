import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBio } from '../redux/actions/userActions';

// import { useDBset } from '../hooks/useDB';

function BioEditor(props) {
    const dispatch = useDispatch();
    const bio = useSelector((state) => state.user.bio && state.user.bio);
    const [editBio, setEditBio] = useState(false);
    const [bioInput, setBioInput] = useState();

    // const [{ data, error }, setData] = useDBset();

    useEffect(() => {
        setBioInput(bio);
    }, [bio]);

    // useEffect(() => {
    //     if (data.bio) props.updateProfile({ bio: data.bio });
    // }, [data.bio]);

    const submit = () => {
        dispatch(updateBio(bioInput));

        // setData({
        //     url: '/profile/upload/bio',
        //     values: { bio: bioInput },
        // });
        // bio = bioInput;
        setEditBio(!editBio);
    };

    // let bio = props.bio;
    return !editBio ? (
        <>
            {bio && <p>{bio}</p>}
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
            {/* {data.err && <div className='error'>{data.err}</div>}
            {error && (
                <div className='error'>Uh, err, something went wrong ...</div>
            )} */}
        </>
    );
}

export default BioEditor;
