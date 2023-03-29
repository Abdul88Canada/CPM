import axios from "axios";

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // we are on a server
        return axios.create({
            baseURL: 'http://localhost:5000',
            headers: req.headers
        })
    } else {
        // we are on a broswer
        return axios.create({
            baseURL: 'http://localhost:5000'
        })
    }
}