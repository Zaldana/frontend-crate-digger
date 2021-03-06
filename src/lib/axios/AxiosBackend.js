import axios from 'axios';

let url =
    process.env.NODE_ENV === "production"
        ? "https://crate-digger-back-end.herokuapp.com/api/users/"
        : "http://localhost:3001/api/users/"

const AxiosBackend = axios.create({
    baseURL: url,
    timeout: 50000,
    headers: {
        authorization: `Bearer ${window.localStorage.getItem("jwtToken")}`
    }
});

export default AxiosBackend