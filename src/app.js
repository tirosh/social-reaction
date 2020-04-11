import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import axios from './net/axios';
import styled from 'styled-components';
import { useDBget } from './hooks/useDB';
import Profile from './profile';
import ProfilePic from './profile-pic';
import FindPeople from './find-people';
import OtherProfile from './other-profile';
import Uploader from './uploader';

// function App() {
//     const [query, setQuery] = useState('');
//     const [getData, { data, error }] = useDBget('/profile/user', { users: [] });

//     return (
//         <>
//             <form
//                 onSubmit={(e) => {
//                     e.preventDefault();
//                     getData(`/profile/user/${query}`);
//                 }}>
//                 <input
//                     type='text'
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                 />
//                 <button type='submit'>Search</button>
//             </form>
//             {error && <div>Uh, err, something went wrong ...</div>}
//             <ul>
//                 {data.users.map((item) => (
//                     <li key={item.objectID}>
//                         <a href={item.url}>{item.title}</a>
//                     </li>
//                 ))}
//             </ul>
//         </>
//     );
// }

// export default App;

///////////////////////////////////////////////////////////////////////////////

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false,
        };
    }
    componentDidMount() {
        this.getUser();
    }
    async getUser() {
        const { data } = await axios.get('/profile/user');
        data.success
            ? this.setState({
                  id: data.id,
                  first: data.first,
                  last: data.last,
                  imgUrl: data.img_url,
                  bio: data.bio,
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
            <BrowserRouter>
                {/* <Title>Welcome to Immunity</Title> */}

                <ul>
                    {/* <img src='/img/logo.png' alt='Logo' /> */}
                    <li>
                        <a href='/auth/logout'>log out</a>
                    </li>
                    <li>
                        <Link to='/users'>Find other users</Link>
                    </li>
                </ul>

                <ProfilePic
                    first={this.state.first}
                    last={this.state.last}
                    imgUrl={this.state.imgUrl}
                    onClick={() => this.toggleModal()}
                />

                <Route
                    exact
                    path='/'
                    render={() => (
                        <Profile
                            id={this.state.id}
                            first={this.state.first}
                            last={this.state.last}
                            imgUrl={this.state.imgUrl}
                            bio={this.state.bio}
                            updateProfile={(feature) =>
                                this.updateProfile(feature)
                            }
                        />
                    )}
                />

                <Route
                    path='/users'
                    render={(props) => (
                        <FindPeople
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />

                <Route
                    path='/user/:id'
                    render={(props) => (
                        <OtherProfile
                            key={props.match.url}
                            match={props.match}
                            history={props.history}
                        />
                    )}
                />

                {this.state.uploaderVisible && (
                    <Uploader
                        updateProfile={(profile) => this.updateProfile(profile)}
                        toggleModal={() => this.toggleModal()}
                    />
                )}
            </BrowserRouter>
        );
    }
}
