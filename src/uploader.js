import React from 'react';
import axios from './net/axios';

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        // console.log('Uploader mounted!');
    }
    onSelect(e) {
        this.file = e.target.files[0];
    }
    uploadImage() {
        // var self = this;
        var formData = new FormData();
        formData.append('file', this.file);
        axios
            .post('/upload/profile/image', formData)
            .then(({ data }) => {
                console.log('data.img_url', data.img_url);
                this.props.updateProfile(data.img_url);
                this.props.toggleModal();
            })
            .catch(err => this.setState({ error: err || 'Try again.' }));
    }
    render() {
        return (
            <div>
                {this.state.error && (
                    <div className='error'>{this.state.error}</div>
                )}
                Want to change your image?
                <input
                    onChange={e => this.onSelect(e)}
                    type='file'
                    name='file'
                    key='file'
                    ref='file'
                    accept='image/*'
                />
                <button onClick={() => this.uploadImage()}>submit</button>
            </div>
        );
    }
}
