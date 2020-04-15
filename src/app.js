import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useDBget } from './hooks/useDB';
import Profile from './profile';
import ProfilePic from './profile-pic';
import FindPeople from './find-people';
import OtherProfile from './other-profile';
import Uploader from './uploader';
import Friends from './friends';

function App() {
    const [{ data, error }, getData] = useDBget('/profile/user');
    const [uploaderVisible, setuploaderVisible] = useState(false);
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser({
            id: data.id,
            first: data.first,
            last: data.last,
            bio: data.bio,
            imgUrl: data.img_url,
        });
    }, [data]);

    const toggleModal = () => {
        setuploaderVisible(!uploaderVisible);
    };

    const updateProfile = (trait) => {
        console.log('updateProfile with:', trait);
        setUser({ ...user, trait });
    };

    return (
        <BrowserRouter>
            <ul>
                <li>
                    <a href='/auth/logout'>log out</a>
                </li>
                <li>
                    <Link to='/users'>Find other users</Link>
                </li>
                <li>
                    <Link to='/friends'>Friends</Link>
                </li>
            </ul>

            <ProfilePic
                first={user.first}
                last={user.last}
                imgUrl={user.imgUrl}
                onClick={toggleModal}
            />

            <Route
                exact
                path='/'
                render={() => (
                    <Profile
                        id={user.id}
                        first={user.first}
                        last={user.last}
                        imgUrl={user.imgUrl}
                        bio={user.bio}
                        updateProfile={(trait) => updateProfile(trait)}
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

            <Route
                path='/friends'
                render={(props) => (
                    <Friends
                        key={props.match.url}
                        match={props.match}
                        history={props.history}
                    />
                )}
            />

            {uploaderVisible && (
                <Uploader
                    updateProfile={(trait) => updateProfile(trait)}
                    toggleModal={toggleModal}
                />
            )}
        </BrowserRouter>
    );
}

export default App;
