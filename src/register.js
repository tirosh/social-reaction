import React from "react";
import axios from "axios";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    submit() {
        axios
            .post("/register", {
                first: this.state.first,
                last: this.state.last,
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
        //this[target.name] = target.value;
        this.setState({
            [target.name]: target.value
        });
    }
    render() {
        return (
            <div className="registration">
                {this.state.error && <div className="error">Ooops!</div>}
                <input
                    name="first"
                    onChange={e => this.handleChange(e)}
                    placeholder="first"
                />
                <input
                    name="last"
                    onChange={e => this.handleChange(e)}
                    placeholder="last"
                />
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
                <input name="_csrf" type="hidden" value="{{csrfToken}}" />
                <button onClick={() => this.submit()}>register</button>
                Already a member? <a href="#">Log in</a>
            </div>
        );
    }
}
