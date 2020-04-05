import React from 'react';
import axios from './net/axios';
import Profile from './profile';
import Uploader from './uploader';
import styled from 'styled-components';

// Create a Title component that'll render an <h1> tag with some styles
const Title = styled.h1`
    font-size: 1.5em;
    text-align: center;
    color: palevioletred;
`;
// // Define our button, but with the use of props.theme this time
// const Button = styled.button`
//     font-size: 1em;
//     margin: 1em;
//     padding: 0.25em 1em;
//     border-radius: 3px;
//     /* Color the border and text with theme.main */
//     color: ${props => props.theme.main};
//     border: 2px solid ${props => props.theme.main};
// `;
// // We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
// Button.defaultProps = {
//     theme: {
//         main: 'palevioletred'
//     }
// };
// // Define what props.theme will look like
// const theme = {
//     main: 'mediumseagreen'
// };

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
    }
    componentDidMount() {
        this.getUser();
    }
    async getUser() {
        const { data } = await axios.get('/profile/user');
        data.success
            ? this.setState({
                  first: data.first,
                  last: data.last,
                  imgUrl: data.img_url,
                  bio: data.bio
              })
            : this.setState({ error: data.err || 'Try again.' });
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
                <Title>Welcome to Immunity</Title>
                <div>
                    <img src='/img/logo.png' alt='Logo' />
                    <a href='/auth/logout'>log out</a>
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
