import React from "react";
import ReactDOM from "react-dom";
import Welcome from "./welcome";

let elem = <img src="logo.png" alt="Logo" />;

if (location.pathname == "/welcome") {
    elem = <Welcome />;
}

ReactDOM.render(elem, document.querySelector("main"));
