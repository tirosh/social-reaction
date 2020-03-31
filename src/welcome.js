// src/welcome.js
import React from "react";
import Registration from "./register";

export default function Welcome() {
    return (
        <div className="wrapper">
            <img className="logo" src="logo.png" alt="logo" />
            <div className="headline">immunity?</div>
            <div className="image">
                <img
                    src="1280px-Albert_Edelfelt_-_Louis_Pasteur_-_1885.jpg"
                    alt="Louis Pasteur"
                />
            </div>
            <Registration />
        </div>
    );
}
