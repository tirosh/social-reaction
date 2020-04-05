import React from 'react';
import axios from './net/axios';

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    onSelect(e) {
        this.file = e.target.files[0];
    }
    async uploadImage() {
        const formData = new FormData();
        formData.append('file', this.file);
        const { data } = await axios.post('/profile/upload/image', formData);
        if (data.err) return this.setState({ error: data.err || 'Try again.' });
        this.props.updateProfile({ imgUrl: data.img_url });
        this.props.toggleModal();
    }
    render() {
        return (
            <div className='modal' onClick={() => this.props.toggleModal()}>
                <div onClick={e => e.stopPropagation()}>
                    {this.state.error && (
                        <div className='error'>{this.state.error}</div>
                    )}
                    <h1>Want to change your image?</h1>
                    <input
                        onChange={e => this.onSelect(e)}
                        type='file'
                        name='file'
                        accept='image/*'
                    />
                    <button onClick={() => this.uploadImage()}>submit</button>
                </div>
            </div>
        );
    }
}
