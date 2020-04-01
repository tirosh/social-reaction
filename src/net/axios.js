import axios from "axios";

const copy = axios.create({
    xsrfCookieName: "_ctkn",
    xsrfHeaderName: "csrf-token"
});

export default copy;
