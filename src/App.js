import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { initUI } from './redux/actions/uiActions';
import { getProfile } from './redux/actions/profileActions';

import Profile from './components/Profile';
import ProfilePic from './components/ProfilePic';
import FindPeople from './components/FindPeople';
import OtherProfile from './components/OtherProfile';
import Friends from './components/Friends';
import Chat from './components/Chat';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
    const dispatch = useDispatch();
    const ui = useSelector((state) => state.ui);
    const profile = useSelector((state) => state.profile);

    const [uploaderVisible, setuploaderVisible] = useState(false);

    useEffect(() => {
        dispatch(initUI());
        dispatch(getProfile());
    }, []);

    useEffect(() => {
        console.log('profile', profile);
    }, [profile]);

    const toggleModal = () => {
        setuploaderVisible(!uploaderVisible);
    };

    const updateProfile = (trait) => {
        console.log('updateProfile with:', trait);
        // setprofile({ ...profile, trait });
    };

    return (
        <Router>
            <div className='app component'>
                <div className='app tag'>
                    <span>App</span>
                </div>
                <div className='app content'>
                    <Navigation />
                    <ProfilePic onClick={toggleModal} />

                    <Route
                        exact
                        path='/'
                        render={() => (
                            <Profile
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
                    <Route path='/chat' render={() => <Chat />} />
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
