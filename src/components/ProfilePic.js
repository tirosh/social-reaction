// profilepic.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../redux/actions/uiActions';
import { uploadImage } from '../redux/actions/profileActions';

export default function ProfilePic() {
    const dispatch = useDispatch();
    const ui = useSelector((state) => state.ui);
    const profile = useSelector((state) => state.profile && state.profile);

    return (
        <>
            <div className='profile-pic component'>
                <div className='profile-pic tag'>
                    <span>ProfilePic</span>
                </div>
                <div className='profile-pic content'>
                    <div className='image'>
                        <img
                            src={profile.img_url || '/img/lego.svg'}
                            alt={`${profile.first} ${profile.last}`}
                            onClick={() => dispatch(toggleModal())}
                        />
                    </div>
                </div>
            </div>
            {ui.uploaderVisible && <Uploader />}
        </>
    );
}

function Uploader() {
    const dispatch = useDispatch();
    const [file, setFile] = useState({});

    function select(e) {
        setFile(e.target.files[0]);
    }

    function submit() {
        dispatch(uploadImage(file));
        dispatch(toggleModal());
    }
    return (
        <div className='modal' onClick={() => dispatch(toggleModal())}>
            <div
                className='uploader component'
                onClick={(e) => e.stopPropagation()}>
                <div className='uploader tag'>
                    <span>Uploader</span>
                </div>
                <div className='uploader content'>
                    {/* {this.state.error && (
                        <div className='error'>{this.state.error}</div>
                    )} */}
                    <h1>Want to change your image?</h1>
                    <input
                        onChange={(e) => select(e)}
                        type='file'
                        name='file'
                        accept='image/*'
                    />
                    <button onClick={submit}>submit</button>
                </div>
            </div>
        </div>
    );
}
