import React from 'react';
import axios from './net/axios';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        const id = this.props.match.params.id;
        axios.get(`/user/${id}.json`).then(data => {
            if (data.redirect) {
                // redirect
                this.props.history.push('/');
            } else {
                this.setState(data);
            }
        });
    }
    render() {
        return (
            <>
                <h2>Profile function component</h2>
                <div className='user profile image medium'>
                    <img src={imgUrl || '/img/lego.svg'} alt={first} />
                </div>
                <div>
                    <h3>
                        {first} {last}
                    </h3>
                    {bio && <p>{bio}</p>}
                </div>
                {this.state.error && (
                    <div className='error'>{this.state.error}</div>
                )}
            </>

            // <div>
            //     <h1>
            //         {this.state.first} {this.state.last}
            //     </h1>
            // </div>
        );
    }
}
