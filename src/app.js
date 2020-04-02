import React from 'react';
import axios from './net/axios';
import Presentational from './presentational';
import Uploader from './uploader';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.updateProfile = this.updateProfile.bind(this);
        this.state = {
            uploaderVisible: false
        };
    }
    // setStateAsync(state) {
    //     return new Promise(resolve => this.setState(state, resolve));
    // }
    // async componentDidMount() {
    //     const data = await axios.post('/user');
    //     return data.id
    //         ? this.setStateAsync({
    //               first: data.first,
    //               last: data.last,
    //               imgUrl: data.img_url
    //           })
    //         : this.setStateAsync({ error: data.err || 'Try again.' });
    // }
    componentDidMount() {
        axios.post('/user').then(({ data }) =>
            data.success
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
    updateProfile(img) {
        console.log('updateProfile was called with img:', img);

        this.setState({ imgUrl: img });
    }
    render() {
        return (
            <>
                <div>
                    <img src='/img/logo.png' alt='Logo' />
                    <a href='/logout'>log out</a>
                </div>
                <Presentational
                    first={this.state.first}
                    last={this.state.last}
                    imgUrl={this.state.imgUrl}
                    toggleModal={() => this.toggleModal()}
                />
                {this.state.uploaderVisible && (
                    <Uploader
                        updateProfile={e => this.updateProfile(e)}
                        toggleModal={() => this.toggleModal()}
                    />
                )}
            </>
        );
    }
}
