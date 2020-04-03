import React from 'react';
import axios from './net/axios';

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editBio: false
        };
    }
    handleChange({ target }) {
        this.setState({ bioInput: target.value });
    }
    toggleEditBio() {
        this.setState({ editBio: !this.state.editBio });
    }
    upload() {
        axios
            .post('/upload/profile/bio', { bio: this.state.bioInput })
            .then(({ data }) => {
                this.props.updateProfile({ bio: data.bio });
                this.setState({ editBio: false });
            })
            .catch(err => this.setState({ error: err || 'Try again.' }));
    }
    render() {
        const bio = this.props.bio;
        {
            this.state.error && <div className='error'>{this.state.error}</div>;
        }
        return !this.state.editBio ? (
            <>
                {bio && <p>{bio}</p>}
                <button onClick={() => this.toggleEditBio()}>
                    {bio ? 'edit' : 'add your bio'}
                </button>
            </>
        ) : (
            <>
                <input
                    type='textarea'
                    name='bio'
                    key='bio'
                    onChange={e => this.handleChange(e)}
                    placeholder='Once upon a time...'
                />
                <button onClick={() => this.upload()}>save</button>
                <button onClick={() => this.toggleEditBio()}>cancel</button>
            </>
        );
    }
}
