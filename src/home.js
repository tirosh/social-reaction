// src/home.js
import React from "react";
import axios from "axios";

// we can only have state in CLASS components!
export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            first: "till",
            last: "grosch" // default values
        };
        // if you don't bind this using an arrow function
        // this.handleClick = this.handleClick.bind(this);
    }

    // runs when the component mounts
    // its the React equivalent of Vue's "mounted" function
    componentDidMount() {
        // axios.get("/home").then(() => {});
        // setTimeout() to simulate a server request
        setTimeout(() => {
            // this.setState() is used to update the state of a component!
            this.setState({
                first: "vegeta",
                last: "rocks",
                email: "till@grosch.xyz"
            });
        }, 1000);
    }

    handleClick() {
        // example: axios.post()
        this.state.last === "rocks"
            ? this.setState({ last: "chill!" })
            : this.setState({ last: "rocks" });
    }

    render() {
        return (
            <div>
                <h1>Home!!!!</h1>
                <h2>{this.props.slogan}</h2>
                <h1 onClick={() => this.handleClick()}>
                    {this.state.first} {this.state.last}
                </h1>
                {this.state.email}
            </div>
        );
    }
}
