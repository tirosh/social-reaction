// src/hello-world.js
import React from "react";
import Home from "./home";

// every component must start with a capital letter!
// dumb/presentational
export default function HelloWorld() {
    var tagLine = "hello yall";
    return (
        <div>
            Hello, World!
            <Home slogan={tagLine} />
        </div>
    );
}
