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
    async upload() {
        const { data } = await axios.post('/profile/upload/bio', {
            bio: this.state.bioInput
        });
        if (data.err) return this.setState({ error: data.err || 'Try again.' });
        this.props.updateProfile({ bio: data.bio });
        this.setState({ editBio: false });
    }
    render() {
        const bio = this.props.bio;
        return !this.state.editBio ? (
            <>
                {bio && <p>{bio}</p>}
                <button onClick={() => this.toggleEditBio()}>
                    {bio ? 'edit' : 'add your bio'}
                </button>
                {this.state.error && (
                    <div className='error'>{this.state.error}</div>
                )}
            </>
        ) : (
            <>
                <label>
                    Bio:
                    <textarea
                        name='bio'
                        key='bio'
                        placeholder='Once upon a time...'
                        value={this.state.bioInput || bio}
                        onChange={e => this.handleChange(e)}
                    />
                </label>
                <button onClick={() => this.upload()}>save</button>
                <button onClick={() => this.toggleEditBio()}>cancel</button>
                {this.state.error && (
                    <div className='error'>{this.state.error}</div>
                )}
            </>
        );
    }
}
