import React from 'react';
import axios from './net/axios';
import Profile from './profile';
import Uploader from './uploader';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
    }
    componentDidMount() {
        axios.post('/user').then(({ data }) =>
            data.success
                ? this.setState({
                      first: data.first,
                      last: data.last,
                      imgUrl: data.img_url,
                      bio: data.bio
                  })
                : this.setState({ error: data.err || 'Try again.' })
        );
    }
    toggleModal() {
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
    }
    updateProfile(profile) {
        console.log('updateProfile with:', profile);
        this.setState(profile);
    }
    render() {
        return (
            <>
                <div>
                    <img src='/img/logo.png' alt='Logo' />
                    <a href='/logout'>log out</a>
                </div>
                <div
                    onClick={() => this.toggleModal()}
                    className='user profile image small'>
                    <img
                        src={this.state.imgUrl || '/img/lego.svg'}
                        alt={this.state.first}
                    />
                </div>
                <Profile
                    first={this.state.first}
                    last={this.state.last}
                    imgUrl={this.state.imgUrl}
                    bio={this.state.bio}
                    updateProfile={profile => this.updateProfile(profile)}
                />
                {this.state.uploaderVisible && (
                    <Uploader
                        updateProfile={profile => this.updateProfile(profile)}
                        toggleModal={() => this.toggleModal()}
                    />
                )}
            </>
        );
    }
}
