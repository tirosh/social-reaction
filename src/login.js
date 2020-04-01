import React from "react";
import axios from "./net/axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/login", {
                email: this.state.email,
                psswd: this.state.psswd
            })
            .then(({ data }) => {
                console.log("data.success", data.success);
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    handleChange({ target }) {
        this.setState({
            [target.name]: target.value
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <div className="error">Ooops!</div>}
                <input
                    name="email"
                    onChange={e => this.handleChange(e)}
                    placeholder="email"
                />
                <input
                    name="psswd"
                    onChange={e => this.handleChange(e)}
                    placeholder="password"
                />
                <button onClick={() => this.submit()}>log in</button>
                or <Link to="/">register</Link>
            </div>
        );
    }
}
