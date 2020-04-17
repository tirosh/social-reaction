// profilepic.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal } from '../redux/actions/uiActions';
import { uploadImage } from '../redux/actions/userActions';

export default function ProfilePic() {
    const ui = useSelector((state) => state.ui);
    const user = useSelector((state) => state.user && state.user);
    const dispatch = useDispatch();

    return (
        <>
            <div className='user profile image small'>
                <img
                    src={user.img_url || '/img/lego.svg'}
                    alt={`${user.first} ${user.last}`}
                    onClick={() => dispatch(toggleModal())}
                />
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
            <div onClick={(e) => e.stopPropagation()}>
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
    );
}
