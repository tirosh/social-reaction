import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBio } from '../redux/actions/userActions';

function BioEditor() {
    const dispatch = useDispatch();
    const bio = useSelector((state) => state.user.bio && state.user.bio);
    const [editBio, setEditBio] = useState(false);
    const [bioInput, setBioInput] = useState();

    useEffect(() => {
        setBioInput(bio);
    }, [bio]);

    const submit = () => {
        dispatch(updateBio(bioInput));
        setEditBio(!editBio);
    };

    return (
        <div className='bio-editor component'>
            <div className='tag'>
                <span>BioEditor Component</span>
            </div>
            <div className='content'>
                {!editBio ? (
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
                        <button onClick={() => setEditBio(!editBio)}>
                            cancel
                        </button>
                        {/* {data.err && <div className='error'>{data.err}</div>}
            {error && (
                <div className='error'>Uh, err, something went wrong ...</div>
            )} */}
                    </>
                )}
            </div>
        </div>
    );
}

export default BioEditor;
