import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBio } from '../redux/actions/profileActions';

function BioEditor() {
    const dispatch = useDispatch();
    const bio = useSelector((state) => state.profile.bio && state.profile.bio);
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
            <div className='bio-editor tag'>
                <span>BioEditor</span>
            </div>
            <div className='bio-editor content'>
                {!editBio ? (
                    <>
                        {bio && <p>{bio}</p>}
                        <button onClick={() => setEditBio(!editBio)}>
                            {bio ? 'edit' : 'add your bio'}
                        </button>
                    </>
                ) : (
                    <>
                        <textarea
                            name='bio'
                            key='bio'
                            placeholder='Once upon a time...'
                            value={bioInput}
                            onChange={(e) => setBioInput(e.target.value)}
                        />
                        <div className='buttons'>
                            <button onClick={submit}>save</button>
                            <button onClick={() => setEditBio(!editBio)}>
                                cancel
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default BioEditor;
