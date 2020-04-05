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
    uploadImage() {
        var formData = new FormData();
        formData.append('file', this.file);
        axios
            .post('/profile/upload/image', formData)
            .then(({ data }) => {
                console.log('data.img_url', data.img_url);
                this.props.updateProfile({ imgUrl: data.img_url });
                this.props.toggleModal();
            })
            .catch(err => this.setState({ error: err || 'Try again.' }));
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
