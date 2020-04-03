import React from 'react';
import axios from './net/axios';

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editingBio: false
        };
    }
    handleChange({ target }) {
        this.setState({ bioInput: target.value });
    }
    toggleEditBio() {
        this.setState({ editingBio: !this.state.editingBio });
    }
    uploadBio() {
        axios
            .post('/upload/profile/bio', this.bioInput)
            .then(({ data }) => {
                console.log('data.img_url', data.bio);
                this.props.updateProfile({ bio: data.bio });
                // this.props.toggleModal();
            })
            .catch(err => this.setState({ error: err || 'Try again.' }));
    }
    render() {
        const bio = this.state.bio;
        if (!this.state.editingBio) {
            return (
                <>
                    {bio && <p>{bio}</p>}
                    {bio ? (
                        <button onClick={this.handleLogoutClick}>edit</button>
                    ) : (
                        <button onClick={() => this.toggleEditBio()}>
                            add your bio
                        </button>
                    )}
                </>
            );
        } else {
            return (
                <>
                    {this.state.error && (
                        <div className='error'>{this.state.error}</div>
                    )}
                    <input
                        type='textarea'
                        name='bio'
                        key='bio'
                        onChange={e => this.handleChange(e)}
                        placeholder='Once upon a time...'
                    />
                    <button onClick={() => this.save()}>save</button>
                    <button onClick={() => this.toggleEditBio()}>cancel</button>
                    <p>{this.state.bioInput}</p>
                </>
            );
        }
    }
}
