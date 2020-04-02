import React from 'react';
import axios from './net/axios';
import Presentational from './presentational';
import Uploader from './uploader';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderVisible: false
        };
    }
    setStateAsync(state) {
        return new Promise(resolve => this.setState(state, resolve));
    }
    componentDidMount() {
        axios.post('/user').then(({ data }) =>
            data.id
                ? this.setState({
                      first: data.first,
                      last: data.last,
                      imgUrl: data.img_url
                  })
                : this.setState({ error: data.err || 'Try again.' })
        );
    }
    toggleModal() {
        console.log('toggle');
        this.setState({ uploaderVisible: !this.state.uploaderVisible });
    }
    muffin() {
        console.log('I am a muffin in APP');
    }

    render() {
        return (
            <>
                <div>
                    <img src='logo.png' alt='Logo' />
                    <a href='/logout'>log out</a>
                </div>
                <Presentational
                    first={this.state.first}
                    last={this.state.last}
                    imgUrl={this.state.imgUrl}
                />
                <h2 onClick={() => this.toggleModal()}>Toggle Uploader</h2>
                {this.state.uploaderVisible && (
                    <Uploader muffin={() => this.muffin()} />
                )}
            </>
        );
    }
}
