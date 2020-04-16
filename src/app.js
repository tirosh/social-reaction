import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { initUI } from './redux/actions/uiActions';
import { getUser } from './redux/actions/userActions';

import Profile from './profile';
import ProfilePic from './profile-pic';
import FindPeople from './find-people';
import OtherProfile from './other-profile';
import Uploader from './uploader';
import Friends from './friends';
import Chat from './chat';

function App() {
    const dispatch = useDispatch();
    const ui = useSelector((state) => state.ui);
    const user = useSelector((state) => state.user);

    const [uploaderVisible, setuploaderVisible] = useState(false);
    // const [user, setUser] = useState({});

    useEffect(() => {
        dispatch(initUI());
        dispatch(getUser());
    }, []);

    useEffect(() => {
        console.log('user', user);
    }, [user]);

    const toggleModal = () => {
        setuploaderVisible(!uploaderVisible);
    };

    const updateProfile = (trait) => {
        console.log('updateProfile with:', trait);
        // setUser({ ...user, trait });
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

            <ProfilePic onClick={toggleModal} />

            <Route
                exact
                path='/'
                render={() => (
                    <Profile updateProfile={(trait) => updateProfile(trait)} />
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
            <Route path='/chat' render={() => <Chat />} />
            {ui.uploaderVisible && (
                <Uploader
                    updateProfile={(trait) => updateProfile(trait)}
                    toggleModal={toggleModal}
                />
            )}
        </BrowserRouter>
    );
}

export default App;
