// src/welcome.js
import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Registration from "./register";
import Login from "./login";
import ResetPassword from "./reset-password";

export default function Welcome() {
    return (
        <HashRouter>
            <div className="welcome">
                <div className="image">
                    <img
                        src="1280px-Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg"
                        alt="Louis Pasteur"
                    />
                </div>
                <div className="form">
                    <div className="headline">welcome to immunity</div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    <Route path="/reset" component={ResetPassword} />
                </div>
                <img className="logo" src="logo.png" alt="logo" />
            </div>
        </HashRouter>
    );
}
