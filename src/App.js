import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { initUI } from './redux/actions/uiActions';
import { getProfile } from './redux/actions/profileActions';

import Profile from './components/Profile';
import FindPeople from './components/FindPeople';
import OtherProfile from './components/OtherProfile';
import Friends from './components/Friends';
import ChatGroup from './components/ChatGroup';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initUI());
        dispatch(getProfile());
    }, []);

    return (
        <Router>
            <div className='app component'>
                <div className='app tag'>
                    <span>App</span>
                </div>
                <div className='app content'>
                    <Navigation />
                    <Route exact path='/'>
                        <Profile />
                    </Route>
                    <Route path='/users'>
                        <FindPeople />
                    </Route>
                    <Route path='/user/:id'>
                        <OtherProfile />
                    </Route>
                    <Route path='/friends'>
                        <Friends />
                    </Route>
                    <Route path='/chat'>
                        <ChatGroup />
                    </Route>
                    <Footer />
                </div>
            </div>
        </Router>
    );
}

export default App;
