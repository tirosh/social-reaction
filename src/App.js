import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { initUI } from './redux/actions/uiActions';
import { getUser } from './redux/actions/userActions';

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
        <Router>
            <div className='app component'>
                <div className='tag'>
                    <span>App Component</span>
                </div>
                <Navigation />
                <div className='content'>
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
                </div>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
