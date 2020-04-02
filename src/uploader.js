import React from 'react';
import axios from './net/axios';

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        console.log('Uploader mounted!');
    }
    uploadImage() {}
    render() {
        return (
            <>
                <h3>This is the uploader Component!</h3>
                <button onClick={() => this.uploadImage()}>Click me!</button>
            </>
        );
    }
}
