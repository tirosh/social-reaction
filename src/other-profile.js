import React from 'react';
import axios from './net/axios';

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {};
    }
    componentDidMount() {
        this.getUser(this.props.match.params.id);
    }
    async getUser(id) {
        const { data } = await axios.get(`/profile/user/${id}`);
        console.log('data', data);
        data.redirect
            ? this.props.history.push('/')
            : this.setState({
                  id: data.id,
                  first: data.first,
                  last: data.last,
                  imgUrl: data.img_url,
                  bio: data.bio,
              });
    }
    render() {
        const { first, last, imgUrl, bio } = this.state;
        return (
            <>
                <h2>OtherProfile</h2>
                <div className='user profile image medium'>
                    <img
                        src={imgUrl || '/img/lego.svg'}
                        alt={`${first} ${last}`}
                    />
                </div>
                <div>
                    <h3>
                        {first} {last}
                    </h3>
                    {bio && <p>{bio}</p>}
                </div>
            </>
        );
    }
}
